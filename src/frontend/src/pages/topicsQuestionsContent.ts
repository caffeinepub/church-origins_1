// Original Church Origins narrative content inspired by common faith questions
// All content rewritten to be Scripture-rooted and copyright-safe

export interface TopicContent {
  slug: string;
  title: string;
  shortDescription: string;
  sections: {
    heading: string;
    content: string;
    references?: string[];
  }[];
  churchOriginsFraming: {
    heading: string;
    content: string;
  };
}

export const topicsQuestionsContent: TopicContent[] = [
  {
    slug: 'who-is-god',
    title: 'Who Is God?',
    shortDescription: 'Understanding the nature and character of the one true God revealed in Scripture.',
    sections: [
      {
        heading: 'The One True God',
        content: 'Scripture reveals that there is only one God—eternal, self-existent, and sovereign over all creation. He is not one god among many, nor is He a force or concept. He is a personal being who created all things, sustains all things, and rules over all things according to His perfect will.',
        references: ['Deuteronomy 6:4', 'Isaiah 45:5-6', 'Psalm 90:2', 'Acts 17:24-25'],
      },
      {
        heading: 'God Is Trinity',
        content: 'The Bible teaches that God exists eternally as three distinct persons—Father, Son, and Holy Spirit—yet remains one God in essence. This mystery of the Trinity is foundational to Christian faith. Each person of the Trinity is fully God, equal in power and glory, yet distinct in role and relationship.',
        references: ['Matthew 28:19', '2 Corinthians 13:14', 'John 1:1-3', 'John 14:16-17'],
      },
      {
        heading: 'God Is Holy and Just',
        content: 'God is perfectly holy—set apart from all sin and evil. His holiness demands justice; He cannot overlook sin or compromise His righteousness. Because God is just, He must punish sin. This reality makes the Gospel all the more glorious: God Himself provided the way for sinners to be reconciled to Him through Christ.',
        references: ['Isaiah 6:3', 'Habakkuk 1:13', 'Romans 3:25-26', '1 John 1:5'],
      },
      {
        heading: 'God Is Love and Mercy',
        content: 'While God is holy and just, He is also loving and merciful. His love is not sentimental or permissive, but sacrificial and purposeful. God demonstrated His love by sending His Son to die for sinners. His mercy is extended to all who repent and trust in Christ, offering forgiveness and eternal life.',
        references: ['1 John 4:8-10', 'Ephesians 2:4-5', 'Psalm 103:8-12', 'Romans 5:8'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'At Church Origins, we affirm the biblical teaching about God as revealed in Scripture alone. We reject any teaching that diminishes God\'s holiness, compromises His justice, or redefines His love apart from the cross of Christ. Understanding who God is—His nature, His character, and His purposes—is foundational to faithful Christian living and worship.',
    },
  },
  {
    slug: 'what-is-sin',
    title: 'What Is Sin?',
    shortDescription: 'Exploring the biblical definition of sin and its consequences for humanity.',
    sections: [
      {
        heading: 'Sin Is Rebellion Against God',
        content: 'Sin is not merely making mistakes or falling short of personal standards. Sin is rebellion against God—a violation of His holy law and a rejection of His rightful authority. Every sin, whether in thought, word, or deed, is ultimately an offense against God Himself.',
        references: ['1 John 3:4', 'Romans 1:18', 'Psalm 51:4', 'James 2:10'],
      },
      {
        heading: 'All Have Sinned',
        content: 'Scripture declares that all people—without exception—are sinners. We are born with a sinful nature inherited from Adam, and we actively choose to sin throughout our lives. No one is righteous on their own; all fall short of God\'s perfect standard.',
        references: ['Romans 3:23', 'Romans 5:12', 'Psalm 51:5', 'Ecclesiastes 7:20'],
      },
      {
        heading: 'The Consequences of Sin',
        content: 'Sin separates us from God and brings death—both physical and spiritual. The wages of sin is eternal death, which means separation from God forever in hell. Sin also corrupts every aspect of human life, affecting our relationships, our world, and our ability to know and worship God.',
        references: ['Romans 6:23', 'Isaiah 59:2', 'Ephesians 2:1-3', 'Revelation 20:14-15'],
      },
      {
        heading: 'We Cannot Save Ourselves',
        content: 'Because we are sinners by nature and by choice, we cannot save ourselves through good works, religious rituals, or moral improvement. Our best efforts are tainted by sin and fall infinitely short of God\'s holiness. Only God can provide the solution to our sin problem.',
        references: ['Ephesians 2:8-9', 'Titus 3:5', 'Isaiah 64:6', 'Romans 3:20'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins emphasizes the biblical teaching on sin because understanding our sinfulness is essential to understanding the Gospel. We reject any teaching that minimizes sin, redefines it as mere weakness, or suggests that humans are basically good. Only when we see the depth of our sin can we appreciate the magnitude of God\'s grace in Christ.',
    },
  },
  {
    slug: 'why-did-jesus-die',
    title: 'Why Did Jesus Die?',
    shortDescription: 'Understanding the purpose and significance of Christ\'s death on the cross.',
    sections: [
      {
        heading: 'Jesus Died as a Substitute',
        content: 'Jesus died in our place, bearing the punishment we deserved for our sins. This is called substitutionary atonement. On the cross, Jesus took upon Himself the wrath of God that should have fallen on us. He died so that we might live.',
        references: ['Isaiah 53:5-6', '1 Peter 2:24', '2 Corinthians 5:21', 'Galatians 3:13'],
      },
      {
        heading: 'Jesus Satisfied God\'s Justice',
        content: 'God\'s holiness demands that sin be punished. Jesus\' death satisfied God\'s justice, paying the full penalty for sin. This is called propitiation—Jesus appeased God\'s wrath and made it possible for God to forgive sinners without compromising His righteousness.',
        references: ['Romans 3:25-26', '1 John 2:2', '1 John 4:10', 'Hebrews 2:17'],
      },
      {
        heading: 'Jesus Reconciled Us to God',
        content: 'Sin created a barrier between holy God and sinful humanity. Through His death, Jesus removed that barrier and made reconciliation possible. Those who trust in Christ are brought into a right relationship with God, no longer enemies but beloved children.',
        references: ['2 Corinthians 5:18-19', 'Colossians 1:19-22', 'Ephesians 2:13-16', 'Romans 5:10'],
      },
      {
        heading: 'Jesus Demonstrated God\'s Love',
        content: 'The cross is the ultimate demonstration of God\'s love. While we were still sinners—enemies of God—Christ died for us. This was not because we deserved it, but because of God\'s great love and mercy. The cross shows us both the severity of sin and the depth of God\'s love.',
        references: ['Romans 5:8', 'John 3:16', '1 John 4:9-10', 'Ephesians 2:4-5'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins affirms the biblical teaching on the substitutionary atonement of Christ. We reject any view that diminishes the necessity of Christ\'s death, redefines it as merely an example, or suggests that God\'s love negates His justice. The cross is central to the Gospel and must remain central to our faith and proclamation.',
    },
  },
  {
    slug: 'what-is-faith',
    title: 'What Is Faith?',
    shortDescription: 'Defining biblical faith and how it differs from mere belief or wishful thinking.',
    sections: [
      {
        heading: 'Faith Is More Than Belief',
        content: 'Biblical faith is not merely intellectual agreement with facts about God or Jesus. Even demons believe in God\'s existence, yet they are not saved. True faith involves knowledge, assent, and trust—knowing the truth about Christ, agreeing that it is true, and personally trusting in Him for salvation.',
        references: ['James 2:19', 'Hebrews 11:1', 'Romans 10:9-10', 'John 1:12'],
      },
      {
        heading: 'Faith Is a Gift from God',
        content: 'Saving faith is not something we generate on our own. It is a gift from God, granted by His grace through the work of the Holy Spirit. God opens our hearts to believe the Gospel and trust in Christ. This does not negate our responsibility to believe, but it reminds us that salvation is entirely God\'s work.',
        references: ['Ephesians 2:8-9', 'Philippians 1:29', 'Acts 16:14', '2 Peter 1:1'],
      },
      {
        heading: 'Faith Trusts in Christ Alone',
        content: 'True faith rests entirely on Jesus Christ and His finished work. It does not trust in personal goodness, religious rituals, or human effort. Faith looks away from self and looks to Christ alone as the sufficient Savior. Any faith that adds works or merit to Christ\'s work is not biblical faith.',
        references: ['Acts 4:12', 'Galatians 2:16', 'Romans 3:28', 'John 14:6'],
      },
      {
        heading: 'Faith Produces Obedience',
        content: 'Genuine faith always results in a changed life. While we are saved by faith alone, true faith is never alone—it produces good works, obedience, and perseverance. Faith without works is dead, not because works save us, but because real faith inevitably transforms us.',
        references: ['James 2:17', 'Ephesians 2:10', '1 John 2:3-6', 'Titus 2:11-14'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins emphasizes that salvation is by grace alone through faith alone in Christ alone. We reject any teaching that adds human works, rituals, or merit to faith as a requirement for salvation. At the same time, we affirm that genuine faith produces a transformed life marked by obedience to God\'s Word.',
    },
  },
  {
    slug: 'what-is-repentance',
    title: 'What Is Repentance?',
    shortDescription: 'Understanding true repentance and its role in salvation and Christian living.',
    sections: [
      {
        heading: 'Repentance Is a Change of Mind',
        content: 'The word "repentance" means a change of mind that leads to a change of direction. It involves recognizing that we have been wrong—living in rebellion against God—and turning away from that rebellion. Repentance is not merely feeling sorry for sin, but a decisive turning from sin to God.',
        references: ['Acts 3:19', 'Luke 13:3', '2 Corinthians 7:10', 'Acts 26:20'],
      },
      {
        heading: 'Repentance Is Essential for Salvation',
        content: 'Jesus and the apostles consistently called people to repent and believe the Gospel. Repentance is not an optional add-on to faith; it is inseparable from saving faith. To trust in Christ means to turn from sin and turn to Him as Lord and Savior. There is no salvation without repentance.',
        references: ['Mark 1:15', 'Acts 2:38', 'Acts 17:30', 'Luke 24:47'],
      },
      {
        heading: 'Repentance Is a Gift from God',
        content: 'Like faith, repentance is granted by God. He opens our hearts to see our sin, grieves us over it, and enables us to turn from it. This does not remove our responsibility to repent, but it reminds us that even our repentance is a work of God\'s grace.',
        references: ['Acts 11:18', '2 Timothy 2:25', 'Acts 5:31', 'Romans 2:4'],
      },
      {
        heading: 'Repentance Is Ongoing',
        content: 'While initial repentance is necessary for salvation, repentance is also a lifelong pattern for believers. As we grow in Christ, the Holy Spirit continues to convict us of sin, and we continue to turn from it. Daily repentance is a mark of genuine faith and spiritual maturity.',
        references: ['1 John 1:8-9', 'Revelation 2:5', 'Psalm 51:10', 'Proverbs 28:13'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins affirms that repentance is essential to the Gospel message. We reject any presentation of the Gospel that omits repentance or reduces it to mere regret. True repentance involves a turning from sin and a turning to God, and it is both the beginning and the ongoing pattern of the Christian life.',
    },
  },
  {
    slug: 'what-is-the-gospel',
    title: 'What Is the Gospel?',
    shortDescription: 'Defining the core message of Christianity and its essential elements.',
    sections: [
      {
        heading: 'The Gospel Is Good News',
        content: 'The word "gospel" means "good news." It is the announcement that God has provided a way for sinful humanity to be reconciled to Him through Jesus Christ. This is not advice, instruction, or a self-help program—it is a declaration of what God has done to save sinners.',
        references: ['1 Corinthians 15:1-4', 'Romans 1:16', 'Mark 1:14-15', 'Ephesians 1:13'],
      },
      {
        heading: 'The Gospel Centers on Christ',
        content: 'The Gospel is about Jesus Christ—His person and His work. He is the eternal Son of God who became man, lived a sinless life, died on the cross for our sins, and rose from the dead. The Gospel is not about us or our efforts; it is about what Christ has accomplished on our behalf.',
        references: ['1 Corinthians 15:3-4', 'Romans 1:3-4', 'Colossians 1:19-20', 'Acts 4:12'],
      },
      {
        heading: 'The Gospel Requires a Response',
        content: 'The Gospel calls for repentance and faith. We must turn from our sin and trust in Jesus Christ alone for salvation. This is not a one-time decision followed by unchanged living, but a life-transforming commitment to follow Christ as Lord.',
        references: ['Mark 1:15', 'Acts 20:21', 'Romans 10:9-10', 'Acts 16:31'],
      },
      {
        heading: 'The Gospel Transforms Lives',
        content: 'Those who believe the Gospel are born again, made new creations in Christ. The Gospel does not merely improve us or give us a fresh start—it fundamentally transforms us. We are forgiven, justified, adopted into God\'s family, and empowered by the Holy Spirit to live for God\'s glory.',
        references: ['2 Corinthians 5:17', 'John 3:3', 'Titus 3:5-7', 'Romans 8:15-16'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins is committed to proclaiming the Gospel as revealed in Scripture—unchanged and uncompromised. We reject any distortion of the Gospel that adds human works, removes the necessity of repentance, or redefines Christ\'s work. The Gospel is the power of God for salvation, and it must remain central to everything we do.',
    },
  },
  {
    slug: 'what-is-salvation',
    title: 'What Is Salvation?',
    shortDescription: 'Exploring the biblical meaning of salvation and what it means to be saved.',
    sections: [
      {
        heading: 'Salvation Is Rescue from Sin',
        content: 'To be saved means to be rescued from the penalty, power, and ultimately the presence of sin. We are saved from God\'s wrath, from spiritual death, and from eternal separation from God. Salvation is not self-improvement or moral reform—it is deliverance from the consequences of our rebellion against God.',
        references: ['Romans 5:9', 'Ephesians 2:1-5', '1 Thessalonians 1:10', 'Colossians 1:13'],
      },
      {
        heading: 'Salvation Is by Grace Alone',
        content: 'Salvation is entirely a work of God\'s grace. We do not earn it, deserve it, or contribute to it. God saves us not because of anything good in us, but because of His mercy and love. Salvation is a gift, received by faith, not achieved by works.',
        references: ['Ephesians 2:8-9', 'Titus 3:5', 'Romans 3:24', '2 Timothy 1:9'],
      },
      {
        heading: 'Salvation Is Through Christ Alone',
        content: 'There is only one way to be saved: through faith in Jesus Christ. He is the only mediator between God and humanity, the only name by which we can be saved. All other religious paths, no matter how sincere, lead to death. Christ alone is the way, the truth, and the life.',
        references: ['Acts 4:12', 'John 14:6', '1 Timothy 2:5', 'John 10:9'],
      },
      {
        heading: 'Salvation Is Secure',
        content: 'Those who are truly saved are kept secure by God\'s power. Salvation is not something we can lose through failure or sin, because it depends on Christ\'s finished work, not our performance. God completes what He begins, and nothing can separate us from His love.',
        references: ['John 10:28-29', 'Philippians 1:6', 'Romans 8:38-39', '1 Peter 1:5'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins affirms the biblical teaching on salvation by grace alone through faith alone in Christ alone. We reject any teaching that adds human merit, religious rituals, or ongoing works as necessary for salvation. We also affirm the security of believers, trusting in God\'s promise to complete the work He has begun in those who belong to Christ.',
    },
  },
  {
    slug: 'what-is-the-church',
    title: 'What Is the Church?',
    shortDescription: 'Understanding the biblical nature and purpose of the church.',
    sections: [
      {
        heading: 'The Church Is the Body of Christ',
        content: 'The church is not a building or an institution—it is the people of God, the body of Christ. All who have trusted in Christ are part of the universal church, united by the Holy Spirit. The church is Christ\'s bride, His flock, and His family, called to display His glory in the world.',
        references: ['1 Corinthians 12:12-27', 'Ephesians 1:22-23', 'Ephesians 5:25-27', 'Colossians 1:18'],
      },
      {
        heading: 'The Church Gathers Locally',
        content: 'While the universal church includes all believers everywhere, the New Testament emphasizes the importance of local churches—specific gatherings of believers in particular places. Local churches are where believers worship together, receive teaching, observe baptism and the Lord\'s Supper, and exercise church discipline.',
        references: ['Acts 2:42-47', 'Hebrews 10:24-25', '1 Corinthians 11:17-34', 'Matthew 18:15-20'],
      },
      {
        heading: 'The Church Is Led by Elders',
        content: 'Scripture teaches that local churches are to be led by qualified elders (also called pastors or overseers) who shepherd the flock, teach sound doctrine, and protect against false teaching. Church leadership is not about power or status, but about servant leadership modeled after Christ.',
        references: ['1 Timothy 3:1-7', 'Titus 1:5-9', '1 Peter 5:1-4', 'Acts 20:28'],
      },
      {
        heading: 'The Church Proclaims the Gospel',
        content: 'The church exists to glorify God by proclaiming the Gospel to the world. We are called to make disciples of all nations, teaching them to observe all that Christ commanded. The church is God\'s primary instrument for spreading the Gospel and building His kingdom on earth.',
        references: ['Matthew 28:18-20', 'Acts 1:8', '2 Corinthians 5:18-20', '1 Peter 2:9'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins emphasizes the importance of the local church as the primary context for Christian life and discipleship. We believe churches should be governed according to the biblical pattern, led by qualified elders, and committed to the apostles\' teaching. Our mission is to help believers find and commit to faithful local churches where the Gospel is preached and Scripture is honored.',
    },
  },
  {
    slug: 'what-is-baptism',
    title: 'What Is Baptism?',
    shortDescription: 'Understanding the meaning, mode, and significance of Christian baptism.',
    sections: [
      {
        heading: 'Baptism Is a Command',
        content: 'Jesus commanded His followers to be baptized. Baptism is not optional for believers—it is an act of obedience that publicly identifies us with Christ and His church. While baptism does not save us, it is the first step of obedience for those who have trusted in Christ.',
        references: ['Matthew 28:19', 'Acts 2:38', 'Acts 10:47-48', 'Mark 16:16'],
      },
      {
        heading: 'Baptism Symbolizes Union with Christ',
        content: 'Baptism pictures our union with Christ in His death, burial, and resurrection. When we are immersed in water, it symbolizes our death to sin and burial with Christ. When we are raised from the water, it symbolizes our resurrection to new life in Christ. Baptism is a powerful visual representation of the Gospel.',
        references: ['Romans 6:3-4', 'Colossians 2:12', 'Galatians 3:27', '1 Peter 3:21'],
      },
      {
        heading: 'Baptism Is for Believers',
        content: 'The New Testament pattern is clear: baptism follows faith. Those who believed the Gospel were baptized. Baptism is not for infants or unbelievers, but for those who have personally trusted in Christ. It is a public profession of faith, declaring to the world that we belong to Jesus.',
        references: ['Acts 2:41', 'Acts 8:12', 'Acts 8:36-38', 'Acts 18:8'],
      },
      {
        heading: 'Baptism Is by Immersion',
        content: 'The word "baptize" means to immerse or plunge under water. The New Testament examples of baptism involve going down into water and coming up out of it. Immersion best pictures the symbolism of death, burial, and resurrection. Sprinkling or pouring does not convey the same meaning.',
        references: ['Matthew 3:16', 'Acts 8:38-39', 'Romans 6:4', 'Colossians 2:12'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins affirms believer\'s baptism by immersion as the biblical pattern. We reject infant baptism and any teaching that baptism is necessary for salvation. Baptism is an important act of obedience and public testimony, but it is faith in Christ alone that saves. We encourage all believers to be baptized in obedience to Christ\'s command.',
    },
  },
  {
    slug: 'what-is-prayer',
    title: 'What Is Prayer?',
    shortDescription: 'Learning to communicate with God through prayer according to Scripture.',
    sections: [
      {
        heading: 'Prayer Is Conversation with God',
        content: 'Prayer is not a ritual or formula—it is personal communication with God. Through prayer, we speak to our heavenly Father, expressing our worship, confession, thanksgiving, and requests. Prayer is a privilege granted to us through Christ, who opened the way for us to approach God with confidence.',
        references: ['Philippians 4:6', 'Hebrews 4:16', '1 Thessalonians 5:17', 'Psalm 145:18'],
      },
      {
        heading: 'Prayer Should Be Reverent',
        content: 'While we can approach God with confidence because of Christ, we must never approach Him carelessly. God is holy, and our prayers should reflect reverence and awe. We come boldly, but not flippantly. We come as beloved children, but we never forget that He is the sovereign King.',
        references: ['Ecclesiastes 5:2', 'Hebrews 12:28-29', 'Psalm 89:7', 'Matthew 6:9'],
      },
      {
        heading: 'Prayer Should Be According to God\'s Will',
        content: 'Effective prayer aligns with God\'s will as revealed in Scripture. We do not pray to manipulate God or demand our desires, but to submit to His purposes. When we pray according to His will, we can be confident that He hears us and will answer according to His wisdom and timing.',
        references: ['1 John 5:14-15', 'Matthew 6:10', 'James 4:3', 'Romans 8:26-27'],
      },
      {
        heading: 'Prayer Should Be Persistent',
        content: 'Jesus taught us to pray persistently, not giving up when answers seem delayed. Persistent prayer is not about wearing God down, but about expressing our dependence on Him and our trust in His timing. God invites us to keep asking, seeking, and knocking.',
        references: ['Luke 18:1-8', 'Luke 11:5-10', '1 Thessalonians 5:17', 'Colossians 4:2'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins encourages believers to develop a consistent prayer life grounded in Scripture. We reject any teaching that treats prayer as a formula for getting what we want or as a means of manipulating God. Prayer is communion with our Father, submission to His will, and dependence on His grace. We pray in Jesus\' name, trusting in His mediation and His promises.',
    },
  },
  {
    slug: 'how-to-read-the-bible',
    title: 'How to Read the Bible',
    shortDescription: 'Practical guidance for reading and understanding Scripture faithfully.',
    sections: [
      {
        heading: 'Read the Bible as God\'s Word',
        content: 'The Bible is not merely a collection of human writings—it is God\'s inspired, inerrant Word. When you read Scripture, you are hearing God speak. Approach it with reverence, expecting God to teach you, correct you, and transform you through His Word.',
        references: ['2 Timothy 3:16-17', '2 Peter 1:20-21', 'Hebrews 4:12', 'Psalm 119:105'],
      },
      {
        heading: 'Read the Bible Regularly',
        content: 'Consistent Bible reading is essential for spiritual growth. Set aside time each day to read Scripture, even if it\'s just a few verses. Regular exposure to God\'s Word renews your mind, strengthens your faith, and equips you to resist temptation and live faithfully.',
        references: ['Joshua 1:8', 'Psalm 1:2-3', 'Acts 17:11', 'Colossians 3:16'],
      },
      {
        heading: 'Read the Bible in Context',
        content: 'To understand Scripture correctly, pay attention to context. Consider the surrounding verses, the book\'s purpose, the original audience, and the broader biblical narrative. Don\'t isolate verses from their context or force your own meaning onto the text. Let Scripture interpret Scripture.',
        references: ['2 Timothy 2:15', 'Acts 8:30-31', 'Luke 24:27', '2 Peter 3:16'],
      },
      {
        heading: 'Read the Bible Prayerfully',
        content: 'Ask the Holy Spirit to illuminate your understanding as you read. Pray for wisdom, humility, and a teachable heart. Bible reading should not be merely an intellectual exercise, but a spiritual discipline that draws you closer to God and transforms your life.',
        references: ['Psalm 119:18', 'James 1:5', 'Ephesians 1:17-18', '1 Corinthians 2:12-14'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins is committed to helping believers read and understand Scripture faithfully. We emphasize the importance of reading the Bible in context, interpreting it according to its plain meaning, and applying it to our lives. We reject any approach that elevates tradition, experience, or human reason above Scripture. The Bible is our sole authority for faith and practice.',
    },
  },
  {
    slug: 'what-happens-after-death',
    title: 'What Happens After Death?',
    shortDescription: 'Understanding the biblical teaching on death, judgment, and eternity.',
    sections: [
      {
        heading: 'Death Is Certain',
        content: 'Scripture teaches that it is appointed for man to die once, and after that comes judgment. Death is the consequence of sin, and no one escapes it. Physical death is not the end of existence, but the transition to eternity—either in the presence of God or separated from Him forever.',
        references: ['Hebrews 9:27', 'Romans 6:23', 'Ecclesiastes 3:20', 'Genesis 3:19'],
      },
      {
        heading: 'Believers Go to Be with Christ',
        content: 'For those who have trusted in Christ, death is not the end but the beginning of eternal life in God\'s presence. To be absent from the body is to be present with the Lord. Believers do not fear death, because Christ has conquered it and promised us eternal life.',
        references: ['2 Corinthians 5:8', 'Philippians 1:21-23', 'John 11:25-26', '1 Thessalonians 4:13-14'],
      },
      {
        heading: 'Unbelievers Face Judgment',
        content: 'Those who die without faith in Christ face eternal judgment. Hell is a real place of conscious, eternal punishment for those who reject God. This is not a popular teaching, but it is clearly taught in Scripture. The reality of hell underscores the urgency of the Gospel and the seriousness of sin.',
        references: ['Matthew 25:46', 'Revelation 20:11-15', 'Luke 16:19-31', '2 Thessalonians 1:8-9'],
      },
      {
        heading: 'Christ Will Return',
        content: 'Jesus will return bodily to judge the living and the dead. Believers will be resurrected to eternal life in glorified bodies, and unbelievers will be resurrected to eternal condemnation. God will create a new heaven and new earth where righteousness dwells, and His people will live with Him forever.',
        references: ['1 Thessalonians 4:16-17', 'Revelation 21:1-4', 'John 5:28-29', 'Acts 1:11'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins affirms the biblical teaching on death, judgment, heaven, and hell. We reject any teaching that denies the reality of hell, promotes universalism, or suggests that death is the end of existence. The reality of eternity should motivate us to live faithfully, share the Gospel urgently, and trust in Christ\'s promise of eternal life.',
    },
  },
  {
    slug: 'how-to-share-your-faith',
    title: 'How to Share Your Faith',
    shortDescription: 'Practical guidance for sharing the Gospel with others.',
    sections: [
      {
        heading: 'Know the Gospel Clearly',
        content: 'Before you can share the Gospel, you must understand it yourself. Be able to explain the problem of sin, the person and work of Christ, and the call to repentance and faith. Study Scripture, grow in your understanding, and be ready to give an answer for the hope you have.',
        references: ['1 Peter 3:15', 'Colossians 4:6', '2 Timothy 2:15', 'Romans 1:16'],
      },
      {
        heading: 'Live a Consistent Life',
        content: 'Your life should back up your words. If you claim to follow Christ but live like the world, your testimony will be undermined. Live in a way that reflects the Gospel—marked by love, integrity, humility, and holiness. Let your life adorn the Gospel you proclaim.',
        references: ['Matthew 5:16', 'Titus 2:10', '1 Peter 2:12', 'Philippians 2:14-15'],
      },
      {
        heading: 'Speak with Boldness and Gentleness',
        content: 'Share the Gospel boldly, without shame or apology. At the same time, speak with gentleness and respect, recognizing that only God can open hearts to believe. You are called to be faithful in proclaiming the truth, trusting the Holy Spirit to do the work of conviction and conversion.',
        references: ['Acts 4:29', '1 Peter 3:15', 'Colossians 4:5-6', '2 Timothy 2:24-25'],
      },
      {
        heading: 'Trust God with the Results',
        content: 'Your responsibility is to faithfully proclaim the Gospel; God\'s responsibility is to save. Do not be discouraged if people reject the message—Jesus Himself was rejected. Plant seeds, water them with prayer, and trust God to bring the growth in His timing.',
        references: ['1 Corinthians 3:6-7', 'Acts 18:9-10', 'Isaiah 55:10-11', 'Romans 10:14-15'],
      },
    ],
    churchOriginsFraming: {
      heading: 'Church Origins Perspective',
      content: 'Church Origins encourages all believers to share their faith boldly and faithfully. We emphasize the importance of proclaiming the biblical Gospel—unchanged and uncompromised—trusting in God\'s power to save. Evangelism is not optional; it is the natural overflow of a life transformed by the Gospel. We equip believers to share their faith with clarity, confidence, and compassion.',
    },
  },
];
