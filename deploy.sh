docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -d postgres

docker build --tag osamamagdy/wc22_backend:latest .

docker push osamamagdy/wc22_backend

