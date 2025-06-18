import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

interface Skill {
  name: string;
  level: number;
  color: string;
}

export function SkillsRadar() {
  const skills: Skill[] = [
    { name: "Técnico", level: 80, color: "#1976D2" },
    { name: "Liderança", level: 65, color: "#388E3C" },
    { name: "Comunicação", level: 90, color: "#E64A19" },
    { name: "Resolução de Problemas", level: 75, color: "#7B1FA2" },
    { name: "Trabalho em Equipe", level: 85, color: "#FFA000" }
  ];

  useEffect(() => {
    const scrollRevealInstance = ScrollReveal({
      distance: '50px',
      duration: 1300, 
      easing: 'ease-out',
      origin: 'bottom',
      delay: 600,
      reset: true,
    });

    scrollRevealInstance.reveal('.skills-radar-container', {
      interval: 200, 
    });

    return () => {
      scrollRevealInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 skills-radar-container">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Visão Geral das Habilidades</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-900 dark:text-gray-300">{skill.name}</span>
              <span className="font-medium text-gray-900 dark:text-gray-300">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: skill.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
