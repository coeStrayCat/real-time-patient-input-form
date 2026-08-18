import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";

export default function ShowcasePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 p-8 ">
      <div>
        <h1 className="text-xl font-bold">Component Showcase</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Preview of components/atoms/* and components/molecules/*
        </p>
      </div>

      <FormField id="firstName" label="First Name" required>
        <Input name="firstName" placeholder="John" />
      </FormField>

      <FormField
        id="email"
        label="Email"
        required
        error="Please enter a valid email address."
      >
        <Input
          name="email"
          type="email"
          placeholder="john@example.com"
          defaultValue="not-an-email"
        />
      </FormField>

      <FormField id="gender" label="Gender" required>
        <Select
          name="gender"
          placeholder="Select gender"
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "other", label: "Other" },
            { value: "prefer_not_to_say", label: "Prefer not to say" },
          ]}
        />
      </FormField>

      <FormField id="religion" label="Religion (optional)">
        <Input name="religion" placeholder="e.g. Buddhist" />
      </FormField>
    </div>
  );
}
