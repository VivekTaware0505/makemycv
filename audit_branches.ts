import { branches, allSubjects, years } from './src/data/exam';

const audit = branches.map(branch => {
  const coverage: Record<number, Record<number, number>> = {};
  years.forEach(year => {
    coverage[year] = {};
    [1, 2].forEach(sem => {
      const count = allSubjects.filter(s => s.branches.includes(branch.id) && s.year === year && s.sem === sem).length;
      coverage[year][sem] = count;
    });
  });
  return {
    id: branch.id,
    name: branch.name,
    stream: branch.stream || 'engineering',
    coverage
  };
});

console.log('| Branch ID | Stream | Y1S1 | Y1S2 | Y2S1 | Y2S2 | Y3S1 | Y3S2 | Y4S1 | Y4S2 |');
console.log('|-----------|--------|------|------|------|------|------|------|------|------|');
audit.forEach(a => {
  const row = [
    a.id,
    a.stream,
    a.coverage[1][1],
    a.coverage[1][2],
    a.coverage[2][1],
    a.coverage[2][2],
    a.coverage[3][1],
    a.coverage[3][2],
    a.coverage[4][1],
    a.coverage[4][2]
  ];
  console.log('| ' + row.join(' | ') + ' |');
});
