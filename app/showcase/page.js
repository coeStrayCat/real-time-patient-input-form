import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ErrorText from "@/components/atoms/ErrorText";

export default function ShowcasePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 p-8 ">
      <div>
        <h1 className="text-xl font-bold">Atom Showcase</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Preview of components/atoms/* 
        </p>
      </div>

      <section className="space-y-2">
        <Label htmlFor="firstName" required>
          First Name
        </Label>
        <Input id="firstName" name="firstName" placeholder="John" />
      </section>

      <section className="space-y-2">
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          defaultValue="not-an-email"
          invalid
          aria-describedby="email-error"
        />
        <ErrorText id="email-error">
          Please enter a valid email address.
        </ErrorText>
      </section>

      <section className="space-y-2">
        <Label htmlFor="gender" required>
          Gender
        </Label>
        <Select
          id="gender"
          name="gender"
          placeholder="Select gender"
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "other", label: "Other" },
            { value: "prefer_not_to_say", label: "Prefer not to say" },
          ]}
        />
      </section>

      <section className="space-y-2">
        <Label htmlFor="religion">Religion (optional)</Label>
        <Input id="religion" name="religion" placeholder="e.g. Buddhist" />
      </section>
    </div>
  );
}
