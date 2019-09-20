import * as ArrayUtil from '../core/ArrayUtil';
import * as StringUtil from '../core/StringUtil';

export interface Pnode {
  start: string;
  children: Pnode[];
  end: string;
}

const pnode = (start: string, children: Pnode[], end: string): Pnode => ({
  start, children, end
});

const single = (s: string): Pnode => pnode(s, [], '');

const setStart = (start: string) => (p: Pnode): Pnode => ({...p, start});

const setChildren = (children: Pnode[]) => (p: Pnode): Pnode => ({...p, children});

const setEnd = (end: string) => (p: Pnode): Pnode => ({...p, end});

const modStart = (f: (s: string) => string) => (p: Pnode): Pnode => setStart(f(p.start))(p);

const modChildren = (f: (cs: Pnode[]) => Pnode[]) => (p: Pnode): Pnode => setChildren(f(p.children))(p);

const modEnd = (f: (s: string) => string) => (p: Pnode): Pnode => setEnd(f(p.end))(p);

const prependStart = (s: string): (p: Pnode) => Pnode => modStart((start) => s + start);

const appendEnd = (s: string): (p: Pnode) => Pnode => modEnd((end) => end + s);

const doRender = (level: number, n: Pnode) => {
  const ind = StringUtil.repeat(level, '  ');

  if (n.children.length === 0) {
    return ind + n.start + n.end;
  } else {
    const rkids = ArrayUtil.map(n.children, (p) => doRender(level + 1, p));
    return ind + n.start + '\n' + rkids.join('\n') + '\n' + ind + n.end;
  }
};

const render = (n: Pnode): string => doRender(0, n);

export const Pnode = {
  pnode,
  single,
  setStart,
  setChildren,
  setEnd,
  modStart,
  modChildren,
  modEnd,
  prependStart,
  appendEnd,
  render
};
