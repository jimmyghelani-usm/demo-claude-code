import type { Meta, StoryObj } from '@storybook/react';
import { MultiStepForm } from './MultiStepForm';

const meta = {
  title: 'Sections/MultiStepForm',
  component: MultiStepForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MultiStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  {
    stepNumber: 1,
    title: 'Fill Out the Entry Form',
    description: 'Fill out the entry form on the right with your social media handle and agree to the terms. We\'ll announce the winner on Cyber(truck) Monday, December 2, 2024.'
  },
  {
    stepNumber: 2,
    title: 'Activate a US Mobile Line',
    description: 'Make sure your US Mobile line is on a paid plan by September 30, 2024, and keep it active through December 2, 2024. If you\'re already on a paid plan, you\'re all set! (Snooze and Custom plans don\'t count.)'
  },
  {
    stepNumber: 3,
    title: 'Post Your Guess',
    description: 'Watch the video and guess how many SIM cards are in the pool. Post your guess on our social media with the hashtag #USMobileSweepstakes. The closest guess submitted first wins.'
  }
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
  },
};

export const CustomSteps: Story = {
  args: {
    steps: [
      {
        stepNumber: 1,
        title: 'Register Account',
        description: 'Create your account with a valid email address and secure password.'
      },
      {
        stepNumber: 2,
        title: 'Verify Email',
        description: 'Check your email and click the verification link to activate your account.'
      },
      {
        stepNumber: 3,
        title: 'Complete Profile',
        description: 'Add your personal information and preferences to get started.'
      },
      {
        stepNumber: 4,
        title: 'Start Using',
        description: 'You\'re all set! Begin exploring our platform and its features.'
      }
    ],
  },
};

export const WithCallbacks: Story = {
  args: {
    steps: defaultSteps,
    onStepChange: (step) => console.log(`Step changed to: ${step}`),
  },
};
