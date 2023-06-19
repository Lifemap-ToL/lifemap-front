import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import { AppComponent, AppVue } from '../../../../src/common/app';

describe('App', () => {
  it('should exist', () => {
    const wrapper = mount<AppComponent>(AppVue);
    expect(wrapper.exists()).toBe(true);
  });
});
