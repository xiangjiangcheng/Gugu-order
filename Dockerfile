FROM 10.18.101.131:8888/gsww_cd/nginx:for-vue.v1.0

COPY dist/ /usr/share/nginx/html/
