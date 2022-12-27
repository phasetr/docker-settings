FROM php:7.4-fpm
# install composer
# RUN echo  nameserver 8.8.8.8 >> /etc/resolv.conf
RUN cd /usr/bin && curl -s http://getcomposer.org/installer | php && ln -s /usr/bin/composer.phar /usr/bin/composer
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get install -y git zip unzip vim
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get install -y libpq-dev libicu-dev default-mysql-client \
  && docker-php-ext-install pdo_mysql intl
WORKDIR /var/www/html
