## KUBERNETES PROJECT

###

Celem projektu było stworzenie klastra z frontendem oraz backendem łączącym się z MongoDB oraz Redisem. Należało wystawić serwisy poprzez Ingress. Zostały stworzone dwa namespace'y (deployment oraz development), działają one niezależnie od siebie. Na każdym z namespaceów mogą w tym samym czasie działać dwie różne wersje aplikacji.

### URUCHOMIENIE PROJEKTU:

### DEPLOYMENT

W celu uruchomienia projektu należy ustawić odpowiednią ścieżkę do folderu, w którym będą przetrzymywane dane mongodb. Należy to ustawić w pliku persistentvolume-mongo.yml. Następnie należy stworzyć namespace poleceniem:

```
kubectl apply -f ./namespace-deployment.yml
```

Po uworzeniu namespace'u można uruchomić pozostałe serwisy:

```
kubectl apply -f .
```

Polecenia należy wykonywać znajdując się w folderze deployment.

### DEVELOPMENT

Aby uruchomić development należy postępować tak samo jak w przypadku deplymentu. Jedyną zmianą jest miejsce, z którego należy wykonywać polecenia. W tym przypadku jest to folder development.

### MONGODB

Serwis mongodb składa się z Developmentu pod nazwą mongo-production, w tym wypadku stworzone została jedna replika, ponieważ korzysta ona z volumenu, a z tych samych danych w jednym momencie może korzystać tylko jedna baza. W przypadku stworzenia dwóch replik, pozostałe będą nieaktywne. Kontener z Mongodb posiada persistent volume pod nazwą pv-mongo oraz persistent volume claim pod nazwą pvc-mongo. Scieżką montowania w kontenerze jest /data/db, lokalnie jest to folder znajdujący się razem z plikami konfiguracyjnymi. W celu wystawienia portu w obszarze klastra stworzony został ClusterIP z portem 27017.

### REDIS

W wypadku redisa zostały stworzone dwie repliki, ponieważ przy przeciążeniu serwisu i awarii jednego poda, zostanie on zastąpiony drugim. Redis w projekcie używany jest jako cache, więc nie posiada on podpiętego volumenu. W celu wystawienia portu w obszarze klastra stworzony został ClusterIP z portem 6379.

### BACKEND

Backend korzysta z image'u umieszczonego na dockerhubie. Stworzone zostały dwie repliki, ponieważ tutaj również powinna być więcej niż 1, z powodów takich samych jak w przypadku bazy danych Redis. Dodatkowo backend korzysta z configmapy gdzie zostały umieszone zmienne środowiskowe z portami oraz adresami serwisów. W celu wystawienia portu w obszarze klastra stworzony został ClusterIP z portem 5000.

### FRONTEND

Frontend również korzysta z image'u umieszonego na dockerhubie. W tym wypadku również zostały stworzone dwie repliki. W celu wystawienia portu w obszarze klastra stworzony został ClusterIP z portem 3000.

### INGRESS

Ingres wystawia korzysta z nginxa, serwisy wystawione są na porcie 80 localhosta. Serwis backendu wystawiony jest pod endpointem /api z przepisywaniem według ustalonego regexu. Korzysta on z serwisu ClusterIP dla backendu. Serwis frontendowy wystawiony jest na / z odpowiednim regexem. Korzysta on z ClusterIP dla frontendu.

W przypadku dużego ruchu na stronie, ilość replik powinna zostać zwiększona, aby równomiernie rozkładać obciążenie na wszystkie pody.

### NAMESPACE'Y

Każdy namespace posiada działającą wersje aplikacji, namespace'y nie są zależne od siebie. Stworzone zostały dwa namespacy: deployment oraz development.
Deweloperska wersja aplikacji dostępna jest pod adresem: http://development <br />
Natomiast wersja produkcyjna znajduje się pod: http://deployment <br />

### WERSJE FRONTENDU

- dev-1.0 (pierwsza wersja produkcyjna, podstawowa aplikacja)
- dev-1.1 (wersja deweloperska, dodanie stylowania)
- dev-1.2 (wersja deweloperska, dodanie dat)
- dev-1.3 (wersja deweloperska, dodanie walidacji)
- dev-1.4 (wersja deweloperska, dodanie możliwości ustawiania zdjęć)
- dev-1.5 (wersja deweloperska, naprawa routów)
- dev-2.0 (ostateczna wersja produkcyjna, dodana edycja zdjęć)

### WERSJE BACKENDU

- dev-1.0 (pierwsza wersja produkcyjna, podstawowa aplikacja)
- dev-1.1 (wersja deweloperska, dodanie obsługi dat)
- dev-1.2 (wersja deweloperska, dodanie obsługi zdjęć)
- dev-2.0 (ostateczna wersja produkcyjna, poprawa schematu todo)

### PROCES ZMIANY WERSJI

W celu dodania nowej wersji należy zmienić wersję image'u na nowo stworzoną, a następnie użyć polecenia:

```
kubectl apply -f ./aktualizowany_serwis
```

Po wdrożeniu danej wersji jest możliwość przełączania się pomiędzy wersjami.
W celu sprawdzenia historii wersji można użyć polecenia:

```
kubectl rollout history -n namespace deployment nazwa_serwisu
```

przykładowo:

```
kubectl rollout history -n deployment deployment frontend-deployment
```

W celu zmiany wersji na jedną z dostępnych można użyć polecenia:

```
kubectl rollout undo -n namespace deployment nazwa_serwisu --to-revision=numer_wersji
```

przykładowo:

```
kubectl rollout undo -n deployment deployment frontend-deployment --to-revision=1
```
