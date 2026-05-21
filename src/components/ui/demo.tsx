import { CircularCarousel, CarouselItem } from '@/components/ui/circular-carousel';

const demoItems: CarouselItem[] = [
  {
    description:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
    title: "Tamar Mendelson",
    subtitle: "Restaurant Critic",
    src:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    description:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
    title: "Joe Charlescraft",
    subtitle: "Frequent Visitor",
    src:
      "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    description:
      "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    title: "Martina Edelweist",
    subtitle: "Satisfied Customer",
    src:
      "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
];

export const CircularCarouselDemo = () => (
  <section className="space-y-12">
    {/* Light carousel section */}
    <div className="bg-[#f7f7fa] p-20 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex"
        style={{ maxWidth: "1456px" }}
      >
        <CircularCarousel
          items={demoItems}
          autoplay={true}
          colors={{
            title: "#0a0a0a",
            subtitle: "#00A6FB",
            description: "#171717",
            arrowBackground: "#141414",
            arrowForeground: "#f1f1f7",
            arrowHoverBackground: "#00A6FB",
          }}
          fontSizes={{
            title: "28px",
            subtitle: "20px",
            description: "20px",
          }}
        />
      </div>
    </div>

    {/* Dark carousel section */}
    <div className="bg-[#060507] p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex"
        style={{ maxWidth: "1024px" }}
      >
        <CircularCarousel
          items={demoItems}
          autoplay={true}
          colors={{
            title: "#f7f7ff",
            subtitle: "#F97316",
            description: "#f1f1f7",
            arrowBackground: "rgba(255, 255, 255, 0.05)",
            arrowForeground: "#ffffff",
            arrowHoverBackground: "#F97316",
          }}
          fontSizes={{
            title: "28px",
            subtitle: "20px",
            description: "20px",
          }}
        />
      </div>
    </div>
  </section>
);

export default CircularCarouselDemo;
