import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

interface Skill {
  name: string;
  level: number;
  color: string;
}

export function SkillsRadar() {
  const skills: Skill[] = [
    { name: "Linux/Servidores", level: 85, color: "#E97627" },
    { name: "Redes de Computadores", level: 80, color: "#1976D2" },
    { name: "Virtualização (Proxmox/VirtualBox)", level: 75, color: "#7B1FA2" },
    { name: "Monitoramento (Zabbix/Grafana)", level: 70, color: "#388E3C" },
    { name: "Firewall (pfSense/Sophos)", level: 65, color: "#E64A19" },
    { name: "Mikrotik RouterOS", level: 70, color: "#FF6F00" },
    { name: "Segurança/Cibersegurança", level: 60, color: "#D32F2F" },
    { name: "Resolução de Problemas", level: 90, color: "#303F9F" }
  ];

  useEffect(() => {
    const scrollRevealInstance = ScrollReveal({
      distance: '50px',
      duration: 600,
      easing: 'ease-out',
      origin: 'bottom',
      delay: 600,
      reset: true,
    });

    scrollRevealInstance.reveal('.skills-radar-container', {
      interval: 100, 
    });

    return () => {
      scrollRevealInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 skills-radar-container">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Habilidades Técnicas</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-900 dark:text-gray-300 font-medium">{skill.name}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-300">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: skill.color,
                  boxShadow: `0 0 10px ${skill.color}40`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          <strong>Foco atual:</strong> Infraestrutura de TI com especialização em segurança cibernética
        </p>
      </div>
    </div>
  );
}
