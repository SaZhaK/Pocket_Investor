insert into users (id, name, surname, age, gender, education, qualified_investor_status, registration_date, portfolio_id, github_login)
values (1, 'Alexander', 'Kolomiets', 20, 0, 'SPSU', false, '15-12-2021', 1, 'SaZhaK');

insert into portfolio (id) values (1);

insert into trade (id, asset_id, amount, price) values (1, 1, 10, 100);
insert into trade (id, asset_id, amount, price) values (2, 2, 5, 200);

insert into asset (id, ticker, last_price, last_time) values (1, 'AMZN', 3000, '15-12-2021');
insert into asset (id, ticker, last_price, last_time) values (2, 'AAPL', 170, '15-12-2021');

insert into portfolio_trades (portfolio_id, trades_id) values (1, 1);
insert into portfolio_trades (portfolio_id, trades_id) values (1, 2);