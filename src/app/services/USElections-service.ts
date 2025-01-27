import { stateService } from './State-service';
import { FetchApi } from './FetchApi-service';
import { YearModel } from '../models/USElections/year-model';
import { VoteResult } from '../models/USElections/vote-result';
import { CandidateVoteResult } from '../models/USElections/candidate-vote-result';
import { StateVoteResult } from '../models/USElections/state-vote-result';
import { VoteCountResult } from '../models/USElections/vote-count-result';
import { Candidate } from '../models/USElections/candidate';
import { BehaviorSubject, concatMap } from 'rxjs';

const API_ENDPOINT = 'https://elections.appbuilder.dev';

class USElectionsService {
  private _popularVotesRepublican$!: BehaviorSubject<VoteCountResult | undefined>;

  public get popularVotesRepublican(): BehaviorSubject<VoteCountResult | undefined> {
    if (!this._popularVotesRepublican$) {
      this._popularVotesRepublican$ = new BehaviorSubject<VoteCountResult | undefined>(undefined);
      stateService.currentlyChosenYear.pipe(
        concatMap(() => this.getVoteCountResult(stateService.currentlyChosenYear.value as any, 'Republican').catch(() => Promise.resolve(undefined)))
      ).subscribe(v => this._popularVotesRepublican$.next(v));
    }
    return this._popularVotesRepublican$;
  }

  private _electoralVotesRepublican$!: BehaviorSubject<VoteCountResult | undefined>;

  public get electoralVotesRepublican(): BehaviorSubject<VoteCountResult | undefined> {
    if (!this._electoralVotesRepublican$) {
      this._electoralVotesRepublican$ = new BehaviorSubject<VoteCountResult | undefined>(undefined);
      stateService.currentlyChosenYear.pipe(
        concatMap(() => this.getVoteCountResult1(stateService.currentlyChosenYear.value as any, 'Republican').catch(() => Promise.resolve(undefined)))
      ).subscribe(v => this._electoralVotesRepublican$.next(v));
    }
    return this._electoralVotesRepublican$;
  }

  private _popularVotesDemocrat$!: BehaviorSubject<VoteCountResult | undefined>;

  public get popularVotesDemocrat(): BehaviorSubject<VoteCountResult | undefined> {
    if (!this._popularVotesDemocrat$) {
      this._popularVotesDemocrat$ = new BehaviorSubject<VoteCountResult | undefined>(undefined);
      stateService.currentlyChosenYear.pipe(
        concatMap(() => this.getVoteCountResult(stateService.currentlyChosenYear.value as any, 'Democrat').catch(() => Promise.resolve(undefined)))
      ).subscribe(v => this._popularVotesDemocrat$.next(v));
    }
    return this._popularVotesDemocrat$;
  }

  private _democratCandidate$!: BehaviorSubject<Candidate | undefined>;

  public get democratCandidate(): BehaviorSubject<Candidate | undefined> {
    if (!this._democratCandidate$) {
      this._democratCandidate$ = new BehaviorSubject<Candidate | undefined>(undefined);
      stateService.currentlyChosenYear.pipe(
        concatMap(() => this.getCandidate(stateService.currentlyChosenYear.value as any).catch(() => Promise.resolve(undefined)))
      ).subscribe(v => this._democratCandidate$.next(v));
    }
    return this._democratCandidate$;
  }

  private _electoralVotesDemocrat$!: BehaviorSubject<VoteCountResult | undefined>;

  public get electoralVotesDemocrat(): BehaviorSubject<VoteCountResult | undefined> {
    if (!this._electoralVotesDemocrat$) {
      this._electoralVotesDemocrat$ = new BehaviorSubject<VoteCountResult | undefined>(undefined);
      stateService.currentlyChosenYear.pipe(
        concatMap(() => this.getVoteCountResult1(stateService.currentlyChosenYear.value as any, 'Democrat').catch(() => Promise.resolve(undefined)))
      ).subscribe(v => this._electoralVotesDemocrat$.next(v));
    }
    return this._electoralVotesDemocrat$;
  }

  private _republicanCandidate$!: BehaviorSubject<Candidate | undefined>;

  public get republicanCandidate(): BehaviorSubject<Candidate | undefined> {
    if (!this._republicanCandidate$) {
      this._republicanCandidate$ = new BehaviorSubject<Candidate | undefined>(undefined);
      stateService.currentlyChosenYear.pipe(
        concatMap(() => this.getCandidate1(stateService.currentlyChosenYear.value as any).catch(() => Promise.resolve(undefined)))
      ).subscribe(v => this._republicanCandidate$.next(v));
    }
    return this._republicanCandidate$;
  }

  public getYearModelList = async (): Promise<YearModel[]> => {
    return await FetchApi.fetchApiResponse<YearModel[]>(`${API_ENDPOINT}/api/Election/years`, []);
  }

  public getVoteResultList = async (year: number): Promise<VoteResult[]> => {
    if (!year) {
      return Promise.resolve([]);
    }
    return await FetchApi.fetchApiResponse<VoteResult[]>(`${API_ENDPOINT}/api/Election/electoral-votes/${year}`, []);
  }

  public getVoteResultList1 = async (year: number): Promise<VoteResult[]> => {
    if (!year) {
      return Promise.resolve([]);
    }
    return await FetchApi.fetchApiResponse<VoteResult[]>(`${API_ENDPOINT}/api/Election/popular-votes/${year}`, []);
  }

  public getCandidateVoteResultList = async (year: number): Promise<CandidateVoteResult[]> => {
    if (!year) {
      return Promise.resolve([]);
    }
    return await FetchApi.fetchApiResponse<CandidateVoteResult[]>(`${API_ENDPOINT}/api/Election/votes/${year}/by-candidate`, []);
  }

  public getStateVoteResultList = async (year: number): Promise<StateVoteResult[]> => {
    if (!year) {
      return Promise.resolve([]);
    }
    return await FetchApi.fetchApiResponse<StateVoteResult[]>(`${API_ENDPOINT}/api/Election/popular-votes/${year}/by-state`, []);
  }

  public getVoteCountResult = async (year: number, party: string): Promise<VoteCountResult | undefined> => {
    if (!year || !party) {
      return Promise.resolve(undefined);
    }
    return await FetchApi.fetchApiResponse<VoteCountResult | undefined>(`${API_ENDPOINT}/api/Election/popular-votes/${year}/${party}`, undefined);
  }

  public getVoteCountResult1 = async (year: number, party: string): Promise<VoteCountResult | undefined> => {
    if (!year || !party) {
      return Promise.resolve(undefined);
    }
    return await FetchApi.fetchApiResponse<VoteCountResult | undefined>(`${API_ENDPOINT}/api/Election/electoral-votes/${year}/${party}`, undefined);
  }

  public getCandidate = async (year: number): Promise<Candidate | undefined> => {
    if (!year) {
      return Promise.resolve(undefined);
    }
    return await FetchApi.fetchApiResponse<Candidate | undefined>(`${API_ENDPOINT}/api/Election/democratic-candidate/${year}`, undefined);
  }

  public getCandidate1 = async (year: number): Promise<Candidate | undefined> => {
    if (!year) {
      return Promise.resolve(undefined);
    }
    return await FetchApi.fetchApiResponse<Candidate | undefined>(`${API_ENDPOINT}/api/Election/republican-candidate/${year}`, undefined);
  }
}
export const uSElectionsService: USElectionsService = new USElectionsService();
