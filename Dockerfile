FROM nginx:alpine
COPY ./dist/couchbase-demo-todoapp-ui/ /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d/default.conf
