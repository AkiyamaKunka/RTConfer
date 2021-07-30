import React from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Button,
} from '@chakra-ui/react';
import {
    FiHome,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import {AiOutlineTeam} from 'react-icons/ai'
import {FaLaptop} from 'react-icons/fa'
import {IconType} from 'react-icons';
import {ReactText, useContext} from 'react';
import {Link as ReactLink} from 'react-router-dom'
import {BiVideoPlus} from 'react-icons/bi'
import {AuthContext} from "../../store/auth-context/auth-context";
import CreateConferenceDrawer from "./Conference/CreateConferenceDrawer";
import CreateTeamDrawer from "./Team/CreateTeamDrawer";


const LinkItems = [
    {name: 'Home', icon: FiHome, toLink: '/welcome'},
    {name: 'Team', icon: AiOutlineTeam, toLink: `/user-profile-${localStorage.email}/team`},
    {name: 'Conference', icon: FaLaptop, toLink: `/user-profile-${localStorage.email}/conference`},
    {name: 'Settings', icon: FiSettings, toLink: '#'},
];

export default function Sidebar(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                {props.children}
            </Box>
        </Box>
    );
}

// interface
// SidebarProps
// extends
// BoxProps
// {
//     onClose: () => void;
// }

const SidebarContent = ({onClose, ...rest}) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    RTConfer
                </Text>

                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {LinkItems.map((link) => (
                <Link as={ReactLink} to={link.toLink} style={{ textDecoration: 'none' }}>
                    <NavItem key={link.name} icon={link.icon}>
                        {link.name}
                    </NavItem>
                </Link>
            ))}
        </Box>
    );
};

// interface
// NavItemProps
// extends
// FlexProps
// {
//     icon: IconType;
//     children: ReactText;
// }
const NavItem = ({icon, children, ...rest}) => {
    return (
        <Link href="#" style={{textDecoration: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'blue.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const DummyUsers = [
    {
        username: 'AkiyamaKunka',
        email: 'junjia.wang@wisc.edu',
    },
    {
        username: 'JamesYang',
        email: 'youyi.yang@nankai.edu',
    },
    {
        username: 'ParadoxHzy',
        email: 'ziyi.huang@nankai.edu',
    },
    {
        username: 'HaoranYu',
        email: 'haoran.yu@uiuc.edu',
    },
]


// interface
// MobileProps
// extends
// FlexProps
// {
//     onOpen: () => void;
// }
const MobileNav = ({onOpen, ...rest}) => {
    const authCtx = useContext(AuthContext)

    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />
            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                RTConfer
            </Text>

            <CreateTeamDrawer/>
            <CreateConferenceDrawer dummyUsers={DummyUsers}/>
            <HStack spacing={{base: '0', md: '6'}}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell/>}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    // src={
                                    //     'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    // }
                                    // src={userLogo}
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Kunka Akiyama</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        user
                                    </Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Notification</MenuItem>
                            <MenuDivider/>
                            <Link as={ReactLink}
                                  to='/welcome'
                                  onClick={ () => {authCtx.logout()}}
                                  style={{textDecoration: 'none'}}
                            >
                            <MenuItem>Log out</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};