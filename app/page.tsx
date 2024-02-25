"use client"
import { ActionIcon, Box, Grid, Group, Menu, Skeleton, TextInput, UnstyledButton, rem } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Image, } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import {images} from '../public/images/image';
import classes from '../public/LanguagePicker.module.css';
import { fetchASIN , fetchComments, getAWSData } from "./serverActions";
const data = [
  { label: 'India', image: images.india },
  { label: 'UK', image: images.unitedKingdom },
  { label: 'US', image: images.unitedStates },
];
let ASIN : string;
let commments : string;


export default function HomePage() {
  const [res , setRes] = useState([""]);
  const getASIN = async(query : string)=>{
    ASIN = await fetchASIN(query)
    console.log("ASIN : ", ASIN)
  }
  const getComments = async(ASIN : string , country : string)=>{
    commments = await fetchComments(country , ASIN)
    console.log("comments : " , commments)
    const response = await getAWSData(commments);
    console.log("response : " , response)
    console.log("sentences : " , response.sentences)
    setRes(response.sentences);
    console.log(" final res : " , res)
  }
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const [query , setQuery] = useState("");
  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} width={18} height={18} />}
      onClick={() => setSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));
  
  return (
    <>
    <form onSubmit={(e)=>{e.preventDefault();   getASIN(query).then(()=>{getComments(ASIN , selected.label)});}}>
    <div style={{height:"100vh"}}>
        <Group style={{height:"30%"}} justify="center" align="end">
          {/* <form> */}
        <TextInput
          maw={"30%"}
          radius="lg"
          size="xl"
          w={"90%"}
          onChange={(e)=>{setQuery(e.target.value); console.log(query)}}
          pointer={false}
          placeholder="Search product"
          leftSection={
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />  
          }
          rightSection={
            <ActionIcon size={40} radius="xl" color={"cyan"} variant="filled">
              <IconArrowRight
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
        />
        <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
    {/* </form> */}
      </Group>
      <Group justify="center">
      <Skeleton  style={{fontSize : "30px"}} radius={"lg"} m={"xl"} width={"40%"} animate={true} visible={false} height={"50vh"}>
        {res}
      </Skeleton>
      </Group>
    </div>
    </form>
    </>
  );
}
