# System Design

##About

The goal of this project was to take a previously built e-commerce site web service (https://github.com/shazamazon/module-the-best-carousel) and refactor the backend to handle a much larger data set.  

This project was built using an existing code base and then scaling it to handle ten million items (instead of the 105 items that it was originally built to display).  This means it's able to perform effectively with a dramatically larger product portfolio and handle a larger number of requests per second.

I set up both PostgreSQL and MongoDB and seeded each database with ten million items.  Then I used npm loadtest and New Relic to stress test each database and improve performance.  

The goal of the carousel web service evaluation was to compare the efficacy of various deployment methods, databases, and tools to accomplish scale and make other optimizations and enhancements.

## Tech Stack

This component is built with the following technologies:

  - React (front-end)
  - Express (server)
  - MongoDB (non-relational database)
  - Mongoose (server/database communication)
  - PostgreSQL (relational database)
  - node-postgres (server/database communication)
  - New Relic (tool for stress testing)
  - npm loadtest (tool for stress testing)

## Technical Challenges / Research

https://docs.google.com/document/d/1p9Lyn4YmrThfk_4N6tTqr7LRPVUU3iA-Pd_BZKmcbMU/edit?usp=sharing

Some issues I ran into while building the service:

1.   Generating 10M fake product records took a good deal of RAM and CPU, which stressed my computer significantly. Optimization strategies had to be developed.

2.  Import/Exporting/Manipulating data at scale --- the rules and capabilities of technology, especially databases, are very different with 10M primary records. MongoDB and PSQL were not initially performant at that scale, and required indexing.

3.  Decreasing query times and improving my server's RPS capabilities.

User Stories
As a User, I should be able see related product questions and answers when a new product is requested, without much latency.



## Minimum Viable Product (MVP)

The MVP requirement was to be able to performantly serve 500 RPS(requests per second) and keep query times under 50ms, while deployed.

