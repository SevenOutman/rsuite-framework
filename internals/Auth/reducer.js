const initialState = {
  user: {
    id: 1,
    name: 'John',
    role: 'root'
  },
};

export default function (state = initialState, { type, ...payload }) {
  switch (type) {
    default:
      return state;
  }
}