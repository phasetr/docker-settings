FROM php:7.4-fpm-buster

RUN cd /usr/bin && \
    curl -s http://getcomposer.org/installer | php && \
    ln -s /usr/bin/composer.phar /usr/bin/composer && \
    apt-get update && \
    apt-get install -y git libzip-dev zip unzip libicu-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev && \
    docker-php-ext-install zip pdo_mysql && \
    docker-php-ext-configure intl && \
    docker-php-ext-install intl && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd
