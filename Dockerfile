FROM node:4-onbuild

EXPOSE 5000

CMD ["./wait-for-it.sh", "postgres:5432", "--", "./server.js"]