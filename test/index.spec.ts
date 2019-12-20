import { describe, it } from 'mocha';
import { assert } from 'chai';

// tslint:disable:no-magic-numbers no-any

import { extendObjectsOnly } from '../src/index';

describe('#extendObjectsOnly<any>', () => {
  it('should do nothing if there are no values', () => {
    const base = { a: 1 };
    assert.deepEqual(extendObjectsOnly<any>(), {});
    assert.deepEqual(extendObjectsOnly<any>(base), base);
    assert.deepEqual(extendObjectsOnly<any>(base, null), base);
    assert.deepEqual(extendObjectsOnly<any>(base, undefined), base);
  });

  it('should extend and modify the base object', () => {
    const base = {
      num: 1,
      arr: [1, 2, 3],
      obj: {
        foo: 'foo',
        bar: 'bar',
      },
    };

    const res = extendObjectsOnly<any>(base, { num: 2, foobar: 'hoge' });
    assert.deepEqual(res, base);
    assert.deepEqual(res, {
      num: 2,
      arr: [1, 2, 3],
      obj: {
        foo: 'foo',
        bar: 'bar',
      },
      foobar: 'hoge',
    });
  });

  it('should extend the base object as a copy', () => {
    const base = {
      num: 1,
      arr: [1, 2, 3],
      obj: {
        foo: 'foo',
        bar: 'bar',
      },
    };
    const originalBase = JSON.parse(JSON.stringify(base));

    const res = extendObjectsOnly<any>({}, base, { num: 2, foobar: 'hoge' });
    assert.notDeepEqual(res, base);
    assert.deepEqual(base, originalBase);
    assert.deepEqual(res, {
      num: 2,
      arr: [1, 2, 3],
      obj: {
        foo: 'foo',
        bar: 'bar',
      },
      foobar: 'hoge',
    });
  });

  it('should overwrite values with strings', () => {
    const base = {
      str: 'text',
      num: 123,
      obj: { a: 1 },
      arr: [1, 2, 3],
    };
    const values = {
      str: 'newString1',
      num: 'newString2',
      obj: 'newString3',
      arr: 'newString4',
    };

    const res = extendObjectsOnly<any>({}, base, values);
    assert.deepEqual(res, values);
  });

  it('should overwrite values with numbers', () => {
    const base = {
      str: 'text',
      num: 123,
      obj: { a: 1 },
      arr: [1, 2, 3],
    };
    const values = {
      str: 1,
      num: 2,
      obj: 3,
      arr: 4.567,
    };

    const res = extendObjectsOnly<any>({}, base, values);
    assert.deepEqual(res, values);
  });

  it('should overwrite values with arrays', () => {
    const base = {
      str: 'text',
      num: 123,
      obj: { a: 1 },
      arr: [1, 2, 3],
    };
    const values = {
      str: [1, 2, 3],
      num: [4.567],
      obj: ['a', 'b', 'c'],
      arr: [{ a: 1 }, { b: 2 }],
    };

    const res = extendObjectsOnly<any>({}, base, values);
    assert.deepEqual(res, values);
  });

  it('should extend objects', () => {
    const base = {
      str: 'text',
      num: 123,
      obj: { a: 1 },
      arr: [1, 2, 3],
    };
    const values = {
      str: 'newString',
      num: 102030,
      obj: { b: 2 },
      arr: [4, 5, 6],
    };

    const res = extendObjectsOnly<any>({}, base, values);
    assert.deepEqual(res, {
      str: 'newString',
      num: 102030,
      obj: { a: 1, b: 2 },
      arr: [4, 5, 6],
    });
  });

  it('should maintain 2nd..nth parameters unchanged (deep)', () => {
    const base = {};
    const p1 = { a: 1, b: 2 };
    const p1Copy = { a: 1, b: 2 };
    const p2 = { a: 0 };
    const p2Copy = { a: 0 };
    const expected = { a: 0, b: 2 };

    const res = extendObjectsOnly<any>(base, p1, p2);
    assert.deepEqual(res, base);
    assert.deepEqual(res, expected);
    assert.deepEqual(p1, p1Copy);
    assert.deepEqual(p2, p2Copy);
  });

  it('should prevent loops', () => {
    const base = { foo: 'bar' };
    const ext = { value: 123, loop: base };
    const expected = {
      foo: 'bar',
      value: 123,
    };

    const res = extendObjectsOnly<any>(base, ext);
    assert.deepEqual(res, expected);
  });
});
