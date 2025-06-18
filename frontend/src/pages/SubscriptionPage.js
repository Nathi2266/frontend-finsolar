import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  Container,
  VStack,
  Link,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { auth } from '../services/api';
import { useNavigate } from 'react-router-dom';

function SubscriptionPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const user = auth.getCurrentUser();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.400');
  const headingColor = useColorModeValue('gray.900', 'white');
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorderColor = useColorModeValue('gray.300', 'gray.700');
  const spinnerColor = useColorModeValue('blue.500', 'blue.300');

  const subscriptionPlans = useMemo(() => [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$9.99',
      frequency: 'month',
      features: [
        'Access to basic features',
        'Email support',
        'Up to 100 kWh/month',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$19.99',
      frequency: 'month',
      features: [
        'All Basic features',
        'Priority support',
        'Up to 500 kWh/month',
        'Advanced analytics',
      ],
      isPopular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 'Contact Us',
      frequency: '',
      features: [
        'All Premium features',
        'Dedicated account manager',
        'Unlimited kWh/month',
        'Custom integrations',
      ],
    },
  ], []);

  const [selectedPlan, setSelectedPlan] = useState(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    return savedPlan ? JSON.parse(savedPlan) : subscriptionPlans[0];
  });
  const [isSavingPlan, setIsSavingPlan] = useState(false);

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

  const handleSelectAndSavePlan = async (plan) => {
    setIsSavingPlan(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('selectedPlan', JSON.stringify(plan));
      setSelectedPlan(plan);
      toast({
        title: 'Plan Saved!',
        description: `You have successfully selected the ${plan.name}.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Saving Plan',
        description: 'There was an issue saving your plan. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSavingPlan(false);
    }
  };

  if (!user) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
        <Spinner size="xl" color={spinnerColor} />
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={10} px={4}>
      <Container maxW="container.xl">
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate(-1)}
          mb={6}
          colorScheme="teal"
          variant="ghost"
        >
          Back to Home
        </Button>

        <VStack spacing={8} align="center" mb={10}>
          <Heading as="h1" size="xl" color={headingColor} textAlign="center">
            Subscription Plans
          </Heading>
          <Text fontSize="lg" color={textColor} textAlign="center" maxW="lg">
            Choose the perfect plan to power your smart home experience.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {subscriptionPlans.map((plan) => (
            <Box
              key={plan.id}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={plan.id === selectedPlan.id ? 'blue.500' : cardBorderColor}
              bg={cardBg}
              boxShadow={plan.id === selectedPlan.id ? '0 0 10px rgba(66, 153, 225, 0.6)' : 'md'}
              textAlign="center"
              position="relative"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
              transition="all 0.2s ease-in-out"
            >
              {plan.isPopular && (
                <Text
                  position="absolute"
                  top="-15px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="blue.500"
                  color="white"
                  fontSize="sm"
                  fontWeight="bold"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Most Popular
                </Text>
              )}
              <Heading as="h3" size="lg" mb={3} color={headingColor}>
                {plan.name}
              </Heading>
              <Text fontSize="4xl" fontWeight="bold" color={headingColor} mb={4}>
                {plan.price}
                {plan.frequency && <Text as="span" fontSize="md" color={textColor}>/{plan.frequency}</Text>}
              </Text>
              <VStack align="start" spacing={2} mb={6}>
                {plan.features.map((feature, index) => (
                  <Flex key={index} align="center">
                    <FaCheckCircle color="teal" size="1.2em" />
                    <Text ml={3} color={textColor}>{feature}</Text>
                  </Flex>
                ))}
              </VStack>
              <Button
                colorScheme={plan.id === selectedPlan.id ? 'green' : 'blue'}
                size="lg"
                width="full"
                onClick={() => handleSelectAndSavePlan(plan)}
                isLoading={isSavingPlan}
                loadingText="Saving..."
                isDisabled={plan.id === selectedPlan.id}
              >
                {plan.id === selectedPlan.id ? 'Current Plan' : 'Choose Plan'}
              </Button>
            </Box>
          ))}
        </SimpleGrid>

        <Box textAlign="center" mt={10}>
          <Text fontSize="md" color={textColor}>
            Need a custom solution?{' '}
            <Link color="blue.500" href="/contact">
              Contact us
            </Link>
            .
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default SubscriptionPage; 