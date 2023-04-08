import React from "react";

import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import data from "../data.json";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  return (
    <Container maxW={"xl"}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={3}
        bg={"#fff"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}>
        <Text fontSize={"4xl"} fontFamily={"Poppins"}>
          {data.title}
        </Text>
      </Box>
      <Box bg="#fff" w="100%" p={4} borderRadius={"lg"} borderWidth={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            {data.loginTablist.map((item) => (
              <Tab w="50%" key={item.id}>
                {item.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Register/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
