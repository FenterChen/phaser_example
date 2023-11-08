FROM nginx:1.19.3-alpine
COPY ./nginx /etc/nginx/conf.d/
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
