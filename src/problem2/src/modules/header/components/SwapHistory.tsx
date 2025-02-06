import { CounterClockwiseClockIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Inset,
  Table,
} from "@radix-ui/themes";
import { isMobile } from "@utils/helpers";
import * as React from "react";
import Logo from "./Logo";

interface ISwapHistoryProps {}

const SwapHistory: React.FunctionComponent<ISwapHistoryProps> = (props) => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <div>
            <Button color="indigo" variant="soft" size={isMobile ? "1" : "2"}>
              <CounterClockwiseClockIcon />
              <span className="font-bold">History</span>
            </Button>
          </div>
        </Dialog.Trigger>
        <Dialog.Content
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            maxWidth: "100%",
            borderRadius: 0,
          }}
        >
          <div className="flex justify-between">
            <Dialog.Title>Swap History</Dialog.Title>
            <Dialog.Close>
              <IconButton variant="ghost" color="gray">
                <Cross1Icon width="18" height="18" />
              </IconButton>
            </Dialog.Close>
          </div>

          <Inset side="x" my="5">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                  <Table.Cell>danilo@example.com</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                  <Table.Cell>zahra@example.com</Table.Cell>
                  <Table.Cell>Admin</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Inset>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default SwapHistory;
