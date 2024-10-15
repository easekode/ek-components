/* import update from 'immutability-helper';
import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';

import { Card } from './Card';
import { ItemTypes } from './ItemTypes';

const style = {
  width: 400,
};

// enforce an interface to have an id

const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
];

export type DragAndDropDataType<T extends any> = T & {
  id: string;
};

export function useDragAndDrop<T>() {
  return memo(function Container({
    items,
    RenderCard,
  }: {
    items: DragAndDropDataType<T>[];
    RenderCard: FC<DragAndDropDataType<T>>;
  }) {
    const [cards, setCards] = useState(items);

    const findCard = useCallback(
      (id: string) => {
        for (let i = 0; i < cards.length; i++) {
          if (cards[i]?.id === id) {
            return {
              card: cards[i],
              index: i,
            };
          }
          console.log('cards[i]', cards[i], 'id', id);
        }
        return { card: {} as DragAndDropDataType<T>, index: 0 };
      },
      [cards]
    );

    const moveCard = useCallback(
      (id: string, atIndex: number) => {
        const { card, index } = findCard(id);
        setCards(
          update(cards, {
            $splice: [
              [index, 1],
              [atIndex, 0, card],
            ],
          })
        );
      },
      [findCard, cards, setCards]
    );

    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
    return (
      <div ref={drop} style={style}>
        {cards?.map((card) => (
          <>
            {(card?.id && (
              <Card
                key={card.id}
                data={card as any}
                // text={card.text}
                moveCard={moveCard}
                findCard={findCard}
                RenderCard={RenderCard}
              />
            )) ||
              null}
          </>
        ))}
      </div>
    );
  });
}
 */
