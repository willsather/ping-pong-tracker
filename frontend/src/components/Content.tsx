import { Spacer, Table, Text } from "@nextui-org/react";
import { Box } from "@/src/components/Box";

export const Content = () => {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  return (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      <Text h2>Lorem ipsum dolor sit amet</Text>
      <Text size="$lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci. Et
        sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed sed risus pretium quam vulputate. Interdum
        velit euismod in pellentesque massa placerat duis ultricies.
      </Text>
      <Spacer y={1} />
      <Text size="$lg">
        Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh sed pulvinar.
        Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada proin libero nunc consequat
        interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra tellus in hac habitasse platea dictumst.
        Vivamus at augue eget arcu. Augue mauris augue neque gravida in.
      </Text>

      <Table
        aria-label="Example table with dynamic content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {(item) => (
            <Table.Row key={item.key}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Spacer y={1} />
      <Text size="$lg">
        Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh sed pulvinar.
        Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada proin libero nunc consequat
        interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra tellus in hac habitasse platea dictumst.
        Vivamus at augue eget arcu. Augue mauris augue neque gravida in.
      </Text>
    </Box>
  );
};