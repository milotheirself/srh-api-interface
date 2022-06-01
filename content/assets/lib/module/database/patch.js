const fragment = {};
const internal = {};

internal.request = async ({ urn, val }) => {
  const res = await fetch(`${location.origin}/api${urn}`, {
    method: 'patch',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...val }),
  });

  return await res.json();
};

// === groups

fragment.groups = async ({ match, val }) => {
  const urn = `/groups/${match.id}`;
  const res = await internal.request({ urn, val });

  return res;
};

// === people

fragment.peaple = async ({ match, val }) => {
  const urn = `/people/${match.id}`;
  const res = await internal.request({ urn, val });

  return res;
};

export default { ...fragment };
