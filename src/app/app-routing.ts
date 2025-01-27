import { Route } from '@vaadin/router';
import './not-found/not-found.js';
import './candidates-and-votes/candidates-and-votes';

export const routes: Route[] = [
  { path: 'candidates-and-votes', component: 'app-candidates-and-votes', name: 'Candidates and votes' },
  { path: '', component: 'app-candidates-and-votes', name: 'Candidates and votes' },
  // The fallback route should always be after other alternatives.
  { path: '(.*)', component: 'app-not-found' }
];
