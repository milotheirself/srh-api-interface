const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = ({ urn }: any) => {
  const res = {
    groups: [],
    people: [],
  };

  return new Response(JSON.stringify(res), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });
};

export default { ...fragment };
