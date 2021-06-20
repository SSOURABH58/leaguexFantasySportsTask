import axios from "axios";

const fcAPI = axios.create({
  baseURL: "http://15.206.110.130:5001",
});

const APItoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm1vYmlsZV9udW1iZXIiOiI5MDAwMDAxMDEwIiwiaXNUZW1wVXNlciI6ZmFsc2UsInRlYW1fbmFtZSI6IjEyM2RyZiIsImlhdCI6MTYyMzgzNjAyNCwiZXhwIjoxMDI2MzgzNjAyNCwiYXVkIjoiMTMiLCJpc3MiOiJMZWFndWUgWCJ9.fJh-6ry1oAzAs4jCIjVUnG45LEQSJe9ohlPYtaM71n0";
const header = {
  headers: {
    "x-access-token": APItoken,
  },
};
const initialState = {
  matches: [],
  Leagues: [],
  matchId: 0,
  Squads: [],
  Players: [],
};

export const GET_MATCHS = "fantasyCricket/GET_MATCHS";
export const GET_MATCH_ID = "fantasyCricket/GET_MATCH_ID";
export const GET_LEAGUES = "fantasyCricket/GET_LEAGUES";
export const GET_SQUADS = "fantasyCricket/GET_SQUADS";
export const GET_PLAYERS = "fantasyCricket/GET_PLAYERS";
export const SET_MY_SQUAD = "fantasyCricket/SET_MY_SQUAD";

const fantasyCricket = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MATCHS:
      return { ...state, ...payload };
    case GET_MATCH_ID:
      return { ...state, ...payload };
    case GET_LEAGUES:
      return { ...state, ...payload };
    case GET_SQUADS:
      return { ...state, ...payload, MySquad: NaN };
    case GET_PLAYERS:
      return { ...state, ...payload };
    case SET_MY_SQUAD:
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default fantasyCricket;

export const getMatchs = () => async (dispatch) => {
  const data = await fcAPI.get("/matches/upcoming-matches", header);
  const matches = data.data.matches.cricket;
  return dispatch({ type: GET_MATCHS, payload: { matches } });
};

export const getLeagues = (id) => async (dispatch) => {
  const data = await fcAPI.get(`/leagues?match_id=${id}`, header);
  const Leagues = data.data.leagues;
  return dispatch({ type: GET_LEAGUES, payload: { Leagues } });
};

export const getSquads = (id) => async (dispatch) => {
  const data = await fcAPI.get(`/squad?match_id=${id}`, header);
  const Squads = data.data;
  return dispatch({ type: GET_SQUADS, payload: { Squads } });
};

export const getPlayers = () => async (dispatch, getState) => {
  const state = getState();
  const id = state.fantasyCricket.matchId;
  // console.log(state);
  const data = await fcAPI.get(`/squad/players?match_id=${id}`, header);
  const Players = data.data;
  return dispatch({ type: GET_PLAYERS, payload: { Players } });
};

export const setSquad = (payload) => async (dispatch) => {
  // console.log("Payload", payload);
  const data = await fcAPI.post(`/squad`, payload, header);
  const MySquad = data.data;
  return dispatch({ type: SET_MY_SQUAD, payload: { MySquad } });
};

export const getMatchId = (payload) => ({
  type: GET_MATCH_ID,
  payload: { matchId: payload },
});
