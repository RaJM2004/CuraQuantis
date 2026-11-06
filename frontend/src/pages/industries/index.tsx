import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Law = React.lazy(() => import('./Law'));
const Aerospace = React.lazy(() => import('./Aerospace'));
const Education = React.lazy(() => import('./Education'));
const Semiconductor = React.lazy(() => import('./Semiconductor'));
const Nutrition = React.lazy(() => import('./Nutrition'));
const Meat = React.lazy(() => import('./Meat'));
const Insurance = React.lazy(() => import('./Insurance'));
const Robots = React.lazy(() => import('./Robots'));
const Drones = React.lazy(() => import('./Drones'));

export {
  Law,
  Aerospace,
  Education,
  Semiconductor,
  Nutrition,
  Meat,
  Insurance,
  Robots,
  Drones
};
