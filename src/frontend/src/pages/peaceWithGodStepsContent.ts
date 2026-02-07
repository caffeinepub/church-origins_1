// Content for PeaceWithGod Steps pages - original Church Origins adaptation
// Inspired by the classic "Steps to Peace with God" evangelism framework

export interface StepContent {
  number: number;
  title: string;
  subtitle: string;
  content: string[];
  scriptures: Array<{ reference: string; text: string }>;
}

export const stepsOutline = [
  {
    number: 1,
    title: "God's Purpose: Peace and Life",
    summary: "God loves you and wants you to experience peace and eternal life—abundant and eternal.",
  },
  {
    number: 2,
    title: "The Problem: Sin Separates Us",
    summary: "We choose to disobey God and go our own way, resulting in separation from Him.",
  },
  {
    number: 3,
    title: "God's Remedy: The Cross",
    summary: "Jesus Christ died on the cross and rose from the grave, bridging the gap between God and us.",
  },
  {
    number: 4,
    title: "Our Response: Receive Christ",
    summary: "We must trust Jesus Christ as Lord and Savior and receive Him by personal invitation.",
  },
];

export const stepsContent: StepContent[] = [
  {
    number: 1,
    title: "God's Purpose: Peace and Life",
    subtitle: "God loves you and wants you to experience peace and eternal life—abundant and eternal.",
    content: [
      "God created you with a purpose: to know Him and experience the abundant life He offers. This isn't just about a future hope—it's about real, lasting peace that begins today.",
      "The peace God offers is different from what the world provides. It's not dependent on circumstances, achievements, or relationships. It's a deep, abiding peace that comes from being reconciled to your Creator.",
      "Why don't most people have this peace and abundant life that God planned for us to have? The answer lies in understanding our separation from God.",
    ],
    scriptures: [
      {
        reference: "Romans 5:1",
        text: "We have peace with God through our Lord Jesus Christ.",
      },
      {
        reference: "John 3:16",
        text: "For God so loved the world, that He gave His one and only Son, that whoever believes in Him should not perish but have eternal life.",
      },
      {
        reference: "John 10:10",
        text: "I [Jesus] came that they may have life and have it abundantly.",
      },
    ],
  },
  {
    number: 2,
    title: "The Problem: Sin Separates Us",
    subtitle: "We choose to disobey God and go our own way, resulting in separation from Him.",
    content: [
      "God created us in His own image to have an abundant life. He did not make us as robots to automatically love and obey Him. God gave us a will and freedom of choice.",
      "We choose to disobey God and go our own willful way. We still make this choice today. This results in separation from God. Our sin—our rebellion against God—creates a barrier between us and Him.",
      "People have tried in many ways to bridge this gap between themselves and God through good works, religion, philosophy, and morality. But none of these human efforts can overcome the separation caused by sin.",
      "No bridge reaches God... except one.",
    ],
    scriptures: [
      {
        reference: "Romans 3:23",
        text: "For all have sinned and fall short of the glory of God.",
      },
      {
        reference: "Romans 6:23",
        text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.",
      },
      {
        reference: "Proverbs 14:12",
        text: "There is a way that seems right to a man, but its end is the way to death.",
      },
      {
        reference: "Isaiah 59:2",
        text: "But your iniquities have made a separation between you and your God, and your sins have hidden His face from you so that He does not hear.",
      },
    ],
  },
  {
    number: 3,
    title: "God's Remedy: The Cross",
    subtitle: "Jesus Christ died on the cross and rose from the grave, bridging the gap between God and us.",
    content: [
      "Jesus Christ is God's answer to our problem. He died on the cross and rose from the grave. He paid the penalty for our sin and bridged the gap between God and people.",
      "When Jesus died on the cross, He took upon Himself the punishment that we deserved. When He rose from the dead three days later, He proved His power over sin and death.",
      "This is the good news of the Gospel: God Himself provided the way back to Him through Jesus Christ. No human effort could accomplish this—only God's grace through Christ's sacrifice.",
      "God has provided the only way... Each person must make a choice...",
    ],
    scriptures: [
      {
        reference: "1 Timothy 2:5",
        text: "For there is one God, and there is one mediator between God and men, the man Christ Jesus.",
      },
      {
        reference: "1 Peter 3:18",
        text: "For Christ also suffered once for sins, the righteous for the unrighteous, that He might bring us to God.",
      },
      {
        reference: "Romans 5:8",
        text: "But God shows His love for us in that while we were still sinners, Christ died for us.",
      },
    ],
  },
  {
    number: 4,
    title: "Our Response: Receive Christ",
    subtitle: "We must trust Jesus Christ as Lord and Savior and receive Him by personal invitation.",
    content: [
      "Understanding the Gospel is not enough—we must respond to it. We must trust Jesus Christ as Lord and Savior and receive Him by personal invitation.",
      "God offers salvation as a free gift, but like any gift, it must be received. Jesus stands at the door of your heart and knocks, waiting for you to invite Him in.",
      "Will you receive Jesus Christ right now?",
    ],
    scriptures: [
      {
        reference: "Revelation 3:20",
        text: "Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and eat with him, and he with Me.",
      },
      {
        reference: "John 1:12",
        text: "But to all who did receive Him, who believed in His name, He gave the right to become children of God.",
      },
      {
        reference: "Romans 10:9",
        text: "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised Him from the dead, you will be saved.",
      },
    ],
  },
];

export const responseSteps = [
  {
    title: "Admit your need",
    description: "I am a sinner.",
  },
  {
    title: "Be willing to turn from your sins",
    description: "Repent and ask for God's forgiveness.",
  },
  {
    title: "Believe that Jesus Christ died for you",
    description: "On the cross and rose from the grave.",
  },
  {
    title: "Through prayer, invite Jesus Christ",
    description: "To come in and control your life through the Holy Spirit. Receive Jesus as Lord and Savior.",
  },
];

export const examplePrayer = `Dear God,

I know I am a sinner. I want to turn from my sins, and I ask for Your forgiveness. I believe that Jesus Christ is Your Son. I believe He died for my sins and that You raised Him to life. I want Him to come into my heart and to take control of my life. I want to trust Jesus as my Savior and follow Him as my Lord from this day forward.

In Jesus' Name, amen.`;

export const churchOriginsConnection = {
  title: "Continue Your Journey with Church Origins",
  content: "These steps to peace with God are just the beginning. Church Origins exists to help you grow in your faith through daily Scripture, community connection, and spiritual guidance. Join our community to share your testimony, engage with other believers, and receive encouragement in your walk with Christ.",
};
