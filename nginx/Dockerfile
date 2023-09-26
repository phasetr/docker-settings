FROM nginx:1.25.0 AS base
EXPOSE 80
COPY index.htmo /usr/share/nginx/html/index.html

FROM base AS publish
COPY index1.html /usr/share/nginx/html/index.html

FROM base AS final
COPY index2.html /usr/share/nginx/html/index.html
