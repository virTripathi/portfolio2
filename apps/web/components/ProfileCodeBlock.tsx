import type { Education, Experience, Profile, SkillGroup } from '@portfolio/types';
import { CodeWindow, Line, Cmt, Kw, Fn, Str, Prop, Punc } from '@/components/CodeBlock';

function classNameFromProfile(name: string) {
  return name.replace(/\s+/g, '');
}

function workEntry(job: Experience) {
  const period = job.period.replace(' - ', '-');
  return `{ '${period}': '${job.title} @ ${job.company}' }`;
}

function eduEntry(edu: Education) {
  const key = edu.degree;
  const value = [edu.institution, edu.grade, edu.field].filter(Boolean).join(' - ');
  return `{ '${key}': '${value}' }`;
}

export function ProfileCodeBlock({
  profile,
  experience,
  skills,
  education,
}: {
  profile: Profile;
  experience: Experience[];
  skills: SkillGroup[];
  education: Education[];
}) {
  const sorted = [...experience].sort((a, b) => b.startDate.localeCompare(a.startDate));
  const allSkills = skills.flatMap((g) => g.skills);
  const className = classNameFromProfile(profile.name);

  return (
    <CodeWindow filename={`${className.toLowerCase()}.ts`} data-cursor-magnetic>
      <Line>
        <Cmt>{'// Backend-first engineer shipping end-to-end SaaS.'}</Cmt>
      </Line>
      <Line>
        <Cmt>{'// APIs, distributed systems, and AI-native workflows.'}</Cmt>
      </Line>
      <Line> </Line>
      <Line>
        <Kw>class</Kw> <Fn>{profile.name}</Fn> <Punc>{'{'}</Punc>
      </Line>
      <Line> </Line>
      <Line indent={1}>
        <Fn>constructor</Fn>
        <Punc>{'() {'}</Punc>
      </Line>
      <Line indent={2}>
        <Kw>this</Kw>
        <Punc>.</Punc>
        <Prop>name</Prop>
        <Punc> = </Punc>
        <Str>{`'${profile.name}'`}</Str>
      </Line>
      <Line indent={2}>
        <Kw>this</Kw>
        <Punc>.</Punc>
        <Prop>role</Prop>
        <Punc> = </Punc>
        <Str>{`'${profile.role}'`}</Str>
      </Line>
      <Line indent={2}>
        <Kw>this</Kw>
        <Punc>.</Punc>
        <Prop>location</Prop>
        <Punc> = </Punc>
        <Str>{`'${profile.location}'`}</Str>
      </Line>
      <Line indent={2}>
        <Kw>this</Kw>
        <Punc>.</Punc>
        <Prop>email</Prop>
        <Punc> = </Punc>
        <Str>{`'${profile.email}'`}</Str>
      </Line>
      <Line indent={1}>
        <Punc>{'}'}</Punc>
      </Line>
      <Line> </Line>
      <Line indent={1}>
        <Fn>workExperience</Fn>
        <Punc>{'() {'}</Punc>
      </Line>
      <Line indent={2}>
        <Kw>return</Kw> <Punc>[</Punc>
      </Line>
      {sorted.map((job, i) => (
        <Line key={`${job.company}-${job.startDate}`} indent={3}>
          {workEntry(job)}
          {i < sorted.length - 1 ? <Punc>,</Punc> : null}
        </Line>
      ))}
      <Line indent={2}>
        <Punc>]</Punc>
      </Line>
      <Line indent={1}>
        <Punc>{'}'}</Punc>
      </Line>
      <Line> </Line>
      <Line indent={1}>
        <Fn>education</Fn>
        <Punc>{'() {'}</Punc>
      </Line>
      <Line indent={2}>
        <Kw>return</Kw> <Punc>[</Punc>
      </Line>
      {education.map((edu, i) => (
        <Line key={edu.institution} indent={3}>
          {eduEntry(edu)}
          {i < education.length - 1 ? <Punc>,</Punc> : null}
        </Line>
      ))}
      <Line indent={2}>
        <Punc>]</Punc>
      </Line>
      <Line indent={1}>
        <Punc>{'}'}</Punc>
      </Line>
      <Line> </Line>
      <Line indent={1}>
        <Fn>skills</Fn>
        <Punc>{'() {'}</Punc>
      </Line>
      <Line indent={2}>
        <Kw>return</Kw> <Punc>[ </Punc>
        {allSkills.map((skill, i) => (
          <span key={skill}>
            <Str>{`'${skill}'`}</Str>
            {i < allSkills.length - 1 ? <Punc>{'  '}</Punc> : null}
          </span>
        ))}
        <Punc> ]</Punc>
      </Line>
      <Line indent={1}>
        <Punc>{'}'}</Punc>
      </Line>
      <Line>
        <Punc>{'}'}</Punc>
      </Line>
    </CodeWindow>
  );
}
