create table if not exists portfolio
(
  id                    serial not null primary key
);

create table if not exists users
(
  id                         serial not null primary key,
  name                       varchar(256),
  surname                    varchar(256),
  age                        int,
  gender                     bigint,
  education                  varchar(256),
  qualified_investor_status  boolean,
  registration_date          timestamp not null,
  portfolio_id               bigint,
  github_login               varchar(256) not null,
  foreign key (portfolio_id) references portfolio (id)
);

create table if not exists asset
(
  id         serial not null  primary key,
  ticker     varchar(256) not null unique,
  last_price float not null check (last_price > 0),
  last_time  timestamp not null
);

create table if not exists trade
(
  id                         serial not null  primary key,
  asset_id                   bigint not null,
  amount                     int check (amount > 0),
  price                      float check (price > 0),
  foreign key (asset_id) references asset (id)
);

create table if not exists portfolio_trades
(
  portfolio_id  bigint,
  trades_id     bigint,
  foreign key (portfolio_id) references portfolio (id),
  foreign key (trades_id) references trade (id)
);