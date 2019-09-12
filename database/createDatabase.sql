DROP TABLE IF EXISTS millions;

CREATE TABLE millions (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR (250),
    price NUMERIC (7, 2),
    rating NUMERIC (7, 2),
    rating_count SMALLINT,
    category VARCHAR (30),
    photo_url VARCHAR (250)
);



COPY millions FROM '/Users/whittledeedoodleedoo/hratx43/hratx43-SDC/sdc-carousel/database/products1.txt' (FORMAT CSV, DELIMITER(','));
COPY millions FROM '/Users/whittledeedoodleedoo/hratx43/hratx43-SDC/sdc-carousel/database/products2.txt' (FORMAT CSV, DELIMITER(','));