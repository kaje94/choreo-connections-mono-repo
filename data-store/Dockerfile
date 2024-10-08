FROM mongo:5.0

# Set environment variables for MongoDB root user
ARG MONGO_INITDB_ROOT_USERNAME_ARG
ENV MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME_ARG
ARG MONGO_INITDB_ROOT_PASSWORD_ARG
ENV MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD_ARG

# Create necessary directories with the correct permissions
RUN mkdir -p /backup 
RUN chown -R mongodb:mongodb /data/db /data/configdb /backup

# Install latest fixes
RUN apt-get update && apt-get install -y wget
RUN wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | tee /etc/apt/trusted.gpg.d/server-7.0.asc
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list 
RUN apt-get install -y mongodb-mongosh
ADD  --chown=mongodb:mongodb ./Pixi44Dump.tar /backup

# Switch to non-root user
# Use numeric ID for Choreo security tests 
USER 999

COPY --chown=mongodb:mongodb pixi_setup.sh /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/pixi_setup.sh

# Set usr/bin/mongod as the dockerized entry-point application
CMD ["mongod", "--quiet", "--bind_ip_all", "--auth"]
