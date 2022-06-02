const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

fragment.request = ({ urn, val }: any) => {
  const res = {
    message: 'Done', //
    code: 1,
  };

  return new Response(JSON.stringify(res), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });
};

export default { ...fragment };
