FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_GUIDE_URL=/guide
ARG VITE_API_URL=
ENV VITE_GUIDE_URL=$VITE_GUIDE_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:1.27-alpine
RUN apk add --no-cache curl busybox-extras
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/notify.cgi /opt/notify-www/cgi-bin/notify
COPY deploy/notify-entry.sh /notify-entry.sh
RUN chmod 755 /notify-entry.sh /opt/notify-www/cgi-bin/notify
COPY --from=build /app/dist /usr/share/nginx/html
ENTRYPOINT ["/notify-entry.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
