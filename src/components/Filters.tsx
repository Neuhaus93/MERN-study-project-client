import React from 'react';
import tw, { styled } from 'twin.macro';
import { FiltersAction, FiltersState } from '../reducers/filters-reducer';
import { STATES_US } from '../util/states-us';
import { CheckboxField, SelectField } from './FormFields';

interface FiltersProps {
  filters: FiltersState;
  dispatch: React.Dispatch<FiltersAction>;
  categoryFilter?: boolean;
}

export const DefaultFilter: React.FC<FiltersProps> = (props) => {
  const {
    filters: { category, location },
    dispatch,
    categoryFilter,
  } = props;
  const { tools, equipment, software } = category;

  return (
    <div className='w-full bg-white border-r'>
      <h5 className='uppercase font-bold text-center mt-6'>Filters</h5>
      <hr className='border-t my-6' />
      <Filters>
        <div>
          <h6 className='text-gray-500'>Filter by Categories</h6>
          <div>
            <CheckboxField
              label='Tools'
              checked={tools}
              handleChange={() => dispatch({ type: 'tools' })}
            />
            <CheckboxField
              label='Equipment'
              checked={equipment}
              handleChange={() => dispatch({ type: 'equipment' })}
            />
            <CheckboxField
              label='Software'
              checked={software}
              handleChange={() => dispatch({ type: 'software' })}
            />
          </div>
        </div>
        {categoryFilter && (
          <div className='mt-6 md:mt-8'>
            <h6 className='text-gray-500 mb-2'>Filter by State</h6>
            <SelectField
              options={['Everywhere', ...STATES_US]}
              selected={location}
              setSelected={(value) =>
                dispatch({ type: 'location', payload: value })
              }
            />
          </div>
        )}
      </Filters>
    </div>
  );
};

const Filters = styled.div`
  ${tw`p-4 flex flex-col`}
  ${tw`lg:(px-8)`}
`;
