FROM nginx:alpine
COPY ./dist/angular-todoapp-ui/ /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d/default.conf
