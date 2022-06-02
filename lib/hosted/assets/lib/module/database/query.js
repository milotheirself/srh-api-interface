const fragment = {};
const internal = {};

internal.request = async ({ urn }) => {
  return (
    await fetch(`${location.origin}/api${urn}`, {
      method: 'get',
    })
  ).json();
};

// === groups

fragment.groupsAll = async () => {
  const urn = `/groups`;
  const res = await internal.request({ urn });

  return res.groups;
};

fragment.groups = async ({ match }) => {
  const urn = `/groups/${match.id}`;
  const res = await internal.request({ urn });

  return res.groups[0];
};

// === people

fragment.peopleAll = async () => {
  const urn = `/people`;
  const res = await internal.request({ urn });

  return res.people;
};

fragment.people = async ({ match }) => {
  const urn = `/people/${match.id}`;
  const res = await internal.request({ urn });

  return res.people[0];
};
export default { ...fragment };
