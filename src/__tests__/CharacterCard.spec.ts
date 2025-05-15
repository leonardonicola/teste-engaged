import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import CharacterCard from 'src/components/CharacterCard.vue';
import { describe, expect, it } from 'vitest';

interface CharacterProp {
  character: {
    id?: string | null;
    name?: string | null;
    image?: string | null;
    status?: string | null;
    species?: string | null;
  };
}

function factory(props: CharacterProp) {
  return mount(CharacterCard, {
    props,
  });
}

installQuasarPlugin();

describe('CharacterCard', () => {
  it('should render characters name, species and status', () => {
    const character = {
      id: '1',
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      status: 'Alive',
      species: 'Human',
    };

    const wrapper = factory({ character });

    expect(wrapper.text()).toContain('Rick Sanchez');
    expect(wrapper.text()).toContain('Human - Alive');
  });

  it('handles null/undefined fields gracefully', () => {
    const character = {
      id: null,
      name: null,
      image: null,
      status: null,
      species: null,
    };

    const wrapper = factory({ character });

    expect(wrapper.find('.text-subtitle1').text()).toEqual('Desconhecido');
    expect(wrapper.find('.text-caption').text()).toEqual(
      'Espécie desconhecida - Status desconhecido',
    );
    const img = wrapper.find<HTMLImageElement>('.q-img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('aria-label')).toBe('Rick And Morty Character');
  });

  it('sets default image alt when name is missing', () => {
    const wrapper = factory({
      character: { name: null, image: null, status: null, species: null },
    });

    const img = wrapper.findComponent({ name: 'q-img' });
    expect(img.props('alt')).toBe('Rick And Morty Character');
  });

  it('renders image correctly when image URL is provided', () => {
    const wrapper = factory({
      character: {
        name: 'Morty Smith',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        species: 'Human',
        status: 'Alive',
      },
    });

    const img = wrapper.findComponent({ name: 'q-img' });
    expect(img.props('src')).toBe('https://rickandmortyapi.com/api/character/avatar/2.jpeg');
    expect(img.props('alt')).toBe('Morty Smith');
  });
});
