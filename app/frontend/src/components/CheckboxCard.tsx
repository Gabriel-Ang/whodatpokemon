import { Box, CheckboxCards, Text, Flex } from "@radix-ui/themes";

interface Props {
    items : CheckboxCardItem[];
}
export interface CheckboxCardItem {
    primaryText : string;
    secondaryText : string;
    value : string;
    onItemClick : (data: any) => void;
}

const CheckboxCard = ({ items } : Props) => {
  return (
    <>
      <Box maxWidth="600px">
        <CheckboxCards.Root 
        defaultValue={['1']} 
        columns={{ initial: '1', sm: '3' }}
        >
          {items.map(item => {
            return (
              <CheckboxCards.Item 
              value={ item.value }
              onClick={ () => item.onItemClick(item.value) }
              >
                <Flex 
                direction="column" 
                width="100%"
                >
                  <Text weight="bold">{ item.primaryText }</Text>
                  <Text>{ item.secondaryText }</Text>
                </Flex>
              </CheckboxCards.Item>
            );
          })}
        </CheckboxCards.Root>
      </Box>
    </>
  )
}

export default CheckboxCard;