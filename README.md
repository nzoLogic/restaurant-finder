# [Restauraunt Finder](https://fierce-plains-34186.herokuapp.com/)

## Table of Contents
- [Intro](#intro)
- [Local installation](#local-installation)
- [Tech Stack](#tech-stack)
- [Data Manipulation](#data-manipulation)
- [Component Hierarchical Structure](#component-heirarchical-structure)
- [Challenges](#challenges)
- [Takeaway](#takeaway)

## Intro
Throughout building this project, I had an awesome time exploring Algolia's fascinating world of search and even learned a few valuable development concepts along the way including Node's FileSystem package, location fallback and a more intimate understanding of the complex world of search.

## Local installation
Fork and clone the repo
 * cd restauraunt-finder
 * yarn install
 * yarn start

## Tech Stack
 * React
 * Semantic UI
 * Heroku

## [Data Manipulation](https://github.com/nzoLogic/data-manipulations/tree/master/resources)
For [data manipulation](https://github.com/nzoLogic/data-manipulations/tree/master/resources) I used [FS](https://nodejs.org/api/fs.html) and lodash to combine the two datasets. My implementation was pretty straight forward.
 1. export restaurants_info.csv into JSON format
 2. merge the results with restaurants_list.json
 3. export the results to Algolia  

## Component Hierarchical Structure
Since the Algolia API was very new to me, I decided against using a state management framework for simplicity purposes. By using React's "container" conventions, the project is broken down into 3 primary containers for managing state that are ordered as follows:

 1. LocationContainer - responsible for handling location
 2. SearchContainer - responsible for initializing/querying Algolia index
 3. FacetContainer - manages UI for facet state

## Challenges

Challenges are inherent in any development process. Personally, I view them as an opportunity to grow since challenges always reveal your strengths, weaknesses, and self awareness.

The most difficult challenge I faced was budgeting time around the holidays. Balancing holiday events, out-of-town family visits, and wanting to absolutely **crush** this project proved to be more difficult than I previously imagined. The result were some tough tradeoff decisions listed as follows:

 * responsive design - A great UX and search experience was an absolute must. This required learning as much about Algolia's concepts and API as possible in order to apply technical aptitude towards UX best practices. Responsive design took a hit as a result.

## Takeaway

The requirements encouraged me to become as familiar as possible with Algolia's API and, perhaps more importantly, the mission to provide the best search experience possible. Overall, the development process was enjoyable because it gave me the chance to learn something new. Thank you for that opportunity.



*This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).*
