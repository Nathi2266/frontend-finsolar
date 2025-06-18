import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';

// Import the video
import backgroundVideo from '../assets/videos/Slowed-GridX-Video.mp4';

// Import Chakra UI Components
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Container,
  Spinner,
  useToast,
  IconButton,
  VStack,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Fade,
} from '@chakra-ui/react';

// Import Icons
import {
  FaUser,
  FaMoneyBill,
  FaBell,
  FaCog,
  FaChartLine,
  FaLeaf,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaQuestionCircle,
  FaCommentAlt,
  FaBolt,
  FaGift,
  FaUsers,
  FaCrown, // FaCrown is used for the Subscription icon in navItems
} from 'react-icons/fa';

// Import useColorMode hook
import { useColorMode } from '@chakra-ui/react';

function HomePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const user = auth.getCurrentUser();
  const { colorMode, toggleColorMode } = useColorMode();

  // Update color mode values for better visibility in light mode
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.400'); // Darker text in light mode
  const headingColor = useColorModeValue('gray.900', 'white'); // Darker heading in light mode
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.300', 'gray.700'); // Slightly darker border
  const spinnerColor = useColorModeValue('blue.500', 'blue.300');
  const iconColor = useColorModeValue('gray.800', 'gray.200'); // Darker icons in light mode
  const loadSheddingBg = useColorModeValue('rgba(255, 255, 255, 0.3)', 'gray.700'); // Make inner boxes transparent in light mode
  const loadSheddingText = useColorModeValue('gray.800', 'gray.400'); // Darker text in light mode

  // Update glassmorphism styles for better visibility in light mode
  // eslint-disable-next-line no-unused-vars
  const glassStyle = useColorModeValue(
    {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.85)', // More opaque background
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
      color: 'gray.800', // Ensure text is visible
    },
    {} // Empty object for dark mode, meaning no glassmorphism in dark mode
  );

  // Update card backgrounds for better visibility
  const cardBackgrounds = useColorModeValue(
    {
      nav: 'rgba(255, 255, 255, 0.3)', // More transparent background for light mode
      subscription: 'rgba(255, 255, 255, 0.3)',
      loadShedding: 'rgba(255, 255, 255, 0.3)'
    },
    {
      nav: cardBg,
      subscription: cardBg,
      loadShedding: cardBg
    }
  );

  // Navigation items (Memoized for performance)
  const navItems = useMemo(() => [
    {
      icon: FaChartLine,
      title: 'Dashboard',
      description: 'View your power usage and financial summary',
      path: '/dashboard',
      colorScheme: 'blue'
    },
    {
      icon: FaUser,
      title: 'Profile',
      description: 'Manage your personal information',
      path: '/profile',
      colorScheme: 'teal'
    },
    {
      icon: FaMoneyBill,
      title: 'Top Up',
      description: 'Add credit to your power account',
      path: '/top-up',
      colorScheme: 'green'
    },
    {
      icon: FaChartLine,
      title: 'Expenses',
      description: 'Track your power expenses',
      path: '/expenses',
      colorScheme: 'purple'
    },
    {
      icon: FaBell,
      title: 'Notifications',
      description: 'View your alerts and updates',
      path: '/notifications',
      colorScheme: 'orange'
    },
    {
      icon: FaCog,
      title: 'Settings',
      description: 'Customize your preferences',
      path: '/settings',
      colorScheme: 'gray'
    },
    {
      icon: FaLeaf,
      title: 'Impact',
      description: 'See your environmental impact',
      path: '/impact',
      colorScheme: 'teal'
    },
    {
      icon: FaQuestionCircle,
      title: 'Support',
      description: 'Get help and find answers',
      path: '/support',
      colorScheme: 'blue'
    },
    {
      icon: FaCommentAlt,
      title: 'Forum',
      description: 'Join the community discussion',
      path: '/forum',
      colorScheme: 'purple'
    },
    {
      icon: FaGift,
      title: 'Refer & Earn',
      description: 'Invite friends and get rewards',
      path: '/refer',
      colorScheme: 'orange'
    },
    {
      icon: FaUsers,
      title: 'Group Buying',
      description: 'Join or create group solar purchases and save',
      path: '/group-buying',
      colorScheme: 'purple'
    },
    {
      icon: FaCrown, // Icon for Subscription
      title: 'Subscription',
      description: 'View and manage your subscription plans',
      path: '/subscription', // This path will lead to the new subscription page
      colorScheme: 'purple'
    }
  ], []);

  // Removed: Define Subscription Plans - This data is now handled in SubscriptionPage.js
  // Removed: const subscriptionPlans = useMemo(() => [...], []);

  // Removed: State for selected plan and saving status - This state is now handled in SubscriptionPage.js
  // Removed: const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);
  // Removed: const [isSavingPlan, setIsSavingPlan] = useState(false);

  const [loadSheddingStage] = useState(2); // Mock current stage
  const [nextLoadShedding] = useState({
    date: '2024-03-20',
    startTime: '14:00',
    endTime: '16:30',
    stage: 2
  });

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const solarTips = useMemo(() => [
    'Maximize solar savings by turning off lights when not in use.',
    'Consider energy-efficient appliances to reduce your power consumption.',
    'Optimize your solar panel angle for maximum sun exposure throughout the day.',
    'Use smart plugs to monitor and control energy usage of individual devices.',
    'Unplug electronics when not in use to avoid phantom load.',
    'Regularly clean your solar panels to maintain efficiency.',
    'Invest in a smart thermostat to manage heating and cooling efficiently.',
    'Utilize natural light whenever possible to reduce the need for artificial lighting.',
    'Check for proper insulation in your home to prevent energy loss.',
    'Explore battery storage solutions to store excess solar energy for later use.'
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(prevIndex => (prevIndex + 1) % solarTips.length);
    }, 10000); // Change tip every 10 seconds
    return () => clearInterval(interval);
  }, [solarTips.length]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      toast({
        title: 'Authentication Required',
        description: 'You need to be logged in to access this page',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [user, navigate, toast]);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  // Removed: handleSelectAndSavePlan function - This function is now handled in SubscriptionPage.js
  // Removed: const handleSelectAndSavePlan = async (plan) => {...};

  if (!user) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
        <Spinner size="xl" color={spinnerColor} />
      </Flex>
    );
  }

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      bg={bgColor}
    >
      <Box
        as="video"
        src={backgroundVideo}
        objectFit="cover"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
        zIndex="0"
      />

      <Box position="relative" zIndex="1">
        <Container maxW="container.xl" py={8}>
          {/* Header with Welcome and Theme Toggle */}
          <Flex justify="space-between" align="center" mb={8}>
            {/* Welcome Section */}
            <Box>
              <Heading
                as="h1"
                size="xl"
                color={headingColor}
                mb={2}
              >
                Welcome, {user.name}!
              </Heading>
              <Text fontSize="lg" color={textColor}>
                What would you like to do today?
              </Text>
            </Box>

            {/* Tips and Theme Toggle Section */}
            <Flex align="center" gap={4}>
              <Fade in={true} transition={{ enter: { duration: 0.5 }, exit: { duration: 0.5 } }}>
                <Text
                  fontSize="sm"
                  color={textColor}
                  maxW="300px"
                  textAlign="right"
                  fontStyle="italic"
                >
                  💡 Tip: {solarTips[currentTipIndex]}
                </Text>
              </Fade>

              {/* Theme Toggle Button */}
              <IconButton
                aria-label="Toggle Theme"
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                variant="ghost"
                size="xs"
                color={iconColor}
                fontSize="sm"
              />
            </Flex>
          </Flex>

          {/* Navigation Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={6}
            mb={12}
          >
            {navItems.map((item) => (
              <Box
                key={item.path}
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={cardBorderColor}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  transition: 'all 0.2s'
                }}
                onClick={() => navigate(item.path)}
                cursor="pointer"
                role="group"
                bg={cardBackgrounds.nav}
              >
                <Flex align="center" mb={3}>
                   <Icon
                      as={item.icon}
                      w={8}
                      h={8}
                      color={`${item.colorScheme}.500`}
                      _groupHover={{ color: `${item.colorScheme}.600` }}
                      mr={4}
                   />
                   <Heading as="h3" size="md" color={headingColor}>
                      {item.title}
                   </Heading>
                </Flex>
                <Text fontSize="sm" color={textColor}>
                  {item.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Removed: Old Subscription Plans Section - Content moved to SubscriptionPage.js */}

          {/* Load Shedding Section */}
          <Box
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={cardBorderColor}
            mb={8}
            bg={cardBackgrounds.loadShedding}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h2" size="lg" color={headingColor}>
                Load Shedding Status
              </Heading>
              <Icon as={FaBolt} w={6} h={6} color={loadSheddingStage >= 5 ? 'red.500' : 'yellow.500'} />
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box
                p={4}
                bg={loadSheddingBg}
                borderRadius="md"
              >
                <Text fontSize="sm" color={loadSheddingText} mb={2}>Current Stage</Text>
                <Badge
                  colorScheme={
                    loadSheddingStage >= 5
                      ? 'red'
                      : loadSheddingStage >= 3
                      ? 'orange'
                      : 'yellow'
                  }
                  fontSize="lg"
                  p={2}
                >
                  Stage {loadSheddingStage}
                </Badge>
              </Box>

              <Box
                p={4}
                bg={loadSheddingBg}
                borderRadius="md"
              >
                <Text fontSize="sm" color={loadSheddingText} mb={2}>Next Load Shedding</Text>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="medium">
                    {new Date(nextLoadShedding.date).toLocaleDateString()}
                  </Text>
                  <Text>
                    {nextLoadShedding.startTime} - {nextLoadShedding.endTime}
                  </Text>
                  <Badge
                    colorScheme={
                      nextLoadShedding.stage >= 5
                        ? 'red'
                        : nextLoadShedding.stage >= 3
                        ? 'orange'
                        : 'yellow'
                    }
                    fontSize="md"
                    p={1}
                  >
                    Stage {nextLoadShedding.stage}
                  </Badge>
                </VStack>
              </Box>
            </SimpleGrid>

            {loadSheddingStage >= 5 && (
              <Alert status="error" mt={4} borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>High Load Shedding Stage!</AlertTitle>
                  <AlertDescription>
                    Your area is experiencing Stage {loadSheddingStage} load shedding. Please plan accordingly.
                  </AlertDescription>
                </Box>
              </Alert>
            )}

            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              mt={4}
              onClick={() => navigate('/loadshedding')}
            >
              View Full Schedule
            </Button>
          </Box>

          {/* Contact Us Section */}
          <Box
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={cardBorderColor}
            bg={cardBackgrounds.loadShedding} // Reusing loadShedding background for consistency
          >
            <Heading as="h2" size="lg" mb={4} color={headingColor}>
              Contact Us
            </Heading>
            <Text fontSize="md" color={textColor} mb={4}>
              Have questions or need support? Reach out to our team.
            </Text>
            <Button colorScheme="blue" size="md" onClick={() => navigate('/support')}>
              Contact Support
            </Button>
          </Box>

          {/* Logout Button */}
          <Flex justify="center" mt={8}>
            <Button
              leftIcon={<FaSignOutAlt />}
              colorScheme="red"
              variant="solid"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage; 