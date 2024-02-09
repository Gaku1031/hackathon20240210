FROM php:8.2.12-fpm-alpine3.18

# 必要なパッケージをインストール
RUN apk add --no-cache \
  linux-headers \
  libzip-dev \
  zlib-dev \
  mariadb-client \
  unzip \
  curl \
  vim \
  bash \
  && docker-php-ext-install zip pdo_mysql sockets \
  && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer \
  && composer self-update --2 \
  && echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc

# PHPの設定ファイルをコピー
COPY php.ini /usr/local/etc/php/conf.d/custom.ini

# ワーキングディレクトリを設定
WORKDIR /work/web
