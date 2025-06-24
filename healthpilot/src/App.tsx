import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll, useTransform } from 'framer-motion';
import skyscraperImg from './skyscraper.jpeg'; // Place your skyscraper image in src as skyscraper.jpg

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
`;

const Navbar = styled.nav`
  background: var(--navbar-bg);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-accent);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-right: 6rem;
`;

const NavLink = styled.a`
  color: var(--foreground);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-accent);
  }
`;

const Hero = styled.section`
  padding: 8rem 2rem 4rem;
  text-align: center;
  background: url(${skyscraperImg}) center/cover no-repeat;
  color: #111;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #111;
  text-shadow: 0 0 18px rgba(255,255,255,0.95), 0 0 32px rgba(255,255,255,0.7);
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #fff;
  text-shadow: 0 0 8px rgba(255,255,255,0.7);
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const Button = styled.button`
  background-color: var(--primary-accent);
  color: var(--background);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--button-hover);
  }
`;

const Features = styled.section`
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  color: var(--primary-accent);
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: var(--muted-text);
  line-height: 1.6;
`;

const Footer = styled.footer`
  background-color: var(--footer-bg);
  padding: 2rem;
  text-align: center;
  color: var(--muted-text);
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  margin: 2rem auto;
  max-width: 1200px;
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--glass-shadow);
  border: 1px solid var(--glass-border);
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ChartContainer = styled.div`
  position: relative;
  padding: 2rem;
  background: var(--glass-bg);
  border-radius: 15px;
  overflow: hidden;
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  height: 200px;
  padding: 1rem;
  width: 100%;
  justify-content: center;
`;

const Bar = styled(motion.div)<{ $height: number }>`
  width: 40px;
  background: linear-gradient(180deg, var(--primary-accent) 0%, var(--button-hover) 100%);
  border-radius: 8px 8px 0 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(203, 161, 53, 0.2);
  transition: height 0.3s ease-out;
`;

const CircularChart = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const Circle = styled(motion.circle)`
  fill: none;
  stroke: var(--primary-accent);
  stroke-width: 8;
  stroke-linecap: round;
  transform-origin: center;
  transform: rotate(-90deg);
`;

const ChartLabel = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--primary-accent);
  font-size: 1.5rem;
  font-weight: bold;
`;

const StatsTitle = styled.h2`
  text-align: center;
  color: var(--foreground);
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const StarsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 2.5rem;
`;

const Star = styled(motion.div)`
  color: var(--muted-text);
  position: relative;
  overflow: hidden;
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.5);

  &::before {
    content: '★';
    position: absolute;
    color: var(--primary-accent);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RatingLabel = styled(motion.div)`
  font-size: 1.2rem;
  color: var(--primary-accent);
  font-weight: 500;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto 1rem auto;
  padding: 2rem 1rem;
`;

const SectionTitle = styled.h2`
  color: var(--foreground);
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const PricingTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--glass-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px var(--glass-shadow);
  margin: 0 auto 2rem auto;
`;

const PricingTh = styled.th`
  background: var(--primary-accent);
  color: var(--background);
  font-size: 1.1rem;
  font-weight: 700;
  padding: 1.2rem 1rem;
`;

const PricingTd = styled.td`
  color: var(--foreground);
  font-size: 1.1rem;
  padding: 1.2rem 1rem;
  text-align: center;
  border-bottom: 1px solid var(--glass-border);
`;

const PricingTr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

const ContactCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 4px 24px var(--glass-shadow);
  padding: 2rem 2.5rem;
  color: var(--foreground);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

const ContactName = styled.h3`
  color: var(--primary-accent);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled.p`
  color: var(--foreground);
  font-size: 1.1rem;
  margin: 0.3rem 0;
`;

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollYProgress } = useScroll();
  
  const circleProgress = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1]
  );

  const percentage = useTransform(
    circleProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const barProgress = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1]
  );

  // Create motion values for each bar
  const bar1Height = useTransform(barProgress, [0, 1], ['0%', '60%']);
  const bar2Height = useTransform(barProgress, [0, 1], ['0%', '75%']);
  const bar3Height = useTransform(barProgress, [0, 1], ['0%', '85%']);
  const bar4Height = useTransform(barProgress, [0, 1], ['0%', '95%']);

  const starProgress = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1]
  );

  // Create motion values for each star with faster sequential timing
  const star1Scale = useTransform(starProgress, [0, 0.2], [0, 1]);
  const star2Scale = useTransform(starProgress, [0.2, 0.3], [0, 1]);
  const star3Scale = useTransform(starProgress, [0.3, 0.4], [0, 1]);
  const star4Scale = useTransform(starProgress, [0.4, 0.5], [0, 1]);
  const star5Scale = useTransform(starProgress, [0.5, 0.6], [0, 1]);

  // Label animation - appears right after the last star
  const labelOpacity = useTransform(starProgress, [0.6, 0.7], [0, 1]);
  const labelY = useTransform(starProgress, [0.6, 0.7], [20, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Container>
      <Navbar>
        <Logo>DAVOSAI</Logo>
        <NavLinks>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
      </Navbar>

      <Hero>
        <Title>Transform Your Real Estate Follow-ups with AI</Title>
        <Subtitle>
          Our AI-powered agent automates customer onboarding and follow-ups, 
          helping real estate companies convert more leads and close more deals.
        </Subtitle>
      </Hero>

      <StatsSection>
        <StatsTitle>Real Estate Success Metrics</StatsTitle>
        <StatsContainer>
          <ChartContainer>
            <BarChart>
              <Bar
                $height={60}
                style={{ height: bar1Height }}
              />
              <Bar
                $height={75}
                style={{ height: bar2Height }}
              />
              <Bar
                $height={85}
                style={{ height: bar3Height }}
              />
              <Bar
                $height={95}
                style={{ height: bar4Height }}
              />
            </BarChart>
          </ChartContainer>

          <ChartContainer>
            <CircularChart>
              <svg width="200" height="200" viewBox="0 0 200 200">
                <Circle
                  cx="100"
                  cy="100"
                  r="80"
                  strokeDasharray="502"
                  strokeDashoffset={useTransform(
                    circleProgress,
                    [0, 1],
                    [502, 0]
                  )}
                />
              </svg>
              <ChartLabel>
                {percentage}
              </ChartLabel>
            </CircularChart>
          </ChartContainer>

          <ChartContainer>
            <StarContainer>
              <StarsWrapper>
                <Star
                  style={{
                    opacity: star1Scale,
                    transform: `scale(${star1Scale.get()})`
                  }}
                />
                <Star
                  style={{
                    opacity: star2Scale,
                    transform: `scale(${star2Scale.get()})`
                  }}
                />
                <Star
                  style={{
                    opacity: star3Scale,
                    transform: `scale(${star3Scale.get()})`
                  }}
                />
                <Star
                  style={{
                    opacity: star4Scale,
                    transform: `scale(${star4Scale.get()})`
                  }}
                />
                <Star
                  style={{
                    opacity: star5Scale,
                    transform: `scale(${star5Scale.get()})`
                  }}
                />
              </StarsWrapper>
              <RatingLabel
                style={{
                  opacity: labelOpacity,
                  transform: `translateY(${labelY.get()}px)`
                }}
              >
                Client Satisfaction
              </RatingLabel>
            </StarContainer>
          </ChartContainer>
        </StatsContainer>
      </StatsSection>

      {/* Features Section */}
      <Section id="features">
        <SectionTitle>Features</SectionTitle>
        <Features>
          <FeatureCard>
            <FeatureTitle>Smart Follow-ups</FeatureTitle>
            <FeatureDescription>
              Automatically schedule and send personalized follow-ups based on 
              customer behavior and preferences, ensuring no lead falls through the cracks.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>24/7 Availability</FeatureTitle>
            <FeatureDescription>
              Our AI agent works around the clock to engage with potential clients, 
              answer questions, and schedule appointments at any time.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Intelligent Insights</FeatureTitle>
            <FeatureDescription>
              Get detailed analytics and insights about your leads' behavior, 
              helping you make data-driven decisions to improve conversion rates.
            </FeatureDescription>
          </FeatureCard>
        </Features>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing">
        <SectionTitle>Pricing</SectionTitle>
        <PricingTable>
          <thead>
            <PricingTr>
              <PricingTh>Plan</PricingTh>
              <PricingTh>Price (per month)</PricingTh>
              <PricingTh>Details</PricingTh>
            </PricingTr>
          </thead>
          <tbody>
            <PricingTr>
              <PricingTd>Free Trial</PricingTd>
              <PricingTd>₹0</PricingTd>
              <PricingTd>First month free, no card required</PricingTd>
            </PricingTr>
            <PricingTr>
              <PricingTd>Base</PricingTd>
              <PricingTd>₹5,000</PricingTd>
              <PricingTd>Customer follow-up on mail, website engagement chatbot (text)</PricingTd>
            </PricingTr>
            <PricingTr>
              <PricingTd>Pro</PricingTd>
              <PricingTd>₹10,000</PricingTd>
              <PricingTd>All Base features plus voice and WhatsApp engagement, advanced analytics, priority support</PricingTd>
            </PricingTr>
          </tbody>
        </PricingTable>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <SectionTitle>Contact</SectionTitle>
        <ContactCard>
          <ContactName>Vikram Eashwar</ContactName>
          <ContactInfo>CEO Davos AI</ContactInfo>
          <ContactInfo>+91 98411 79487</ContactInfo>
          <ContactInfo>vikram.davos@gmail.com</ContactInfo>
          <ContactInfo>vikram@davos-ai.com</ContactInfo>
        </ContactCard>
      </Section>

      <Footer>
        <p>© 2024 EstateAI. All rights reserved.</p>
      </Footer>
    </Container>
  );
}

export default App;
