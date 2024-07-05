#!/usr/bin/env python3

"""
This is a helper script to set up the hosts file for testing.

It adds a line to the hosts file that allows to resolve the domain name of
the portal properly even if the docker host has changed it for local testing.
"""

import os
import re
import dns.resolver

name = "data.staging.ghga.dev"  # host name of the portal


def get_ip():
    """Get the IP address of the portal"""
    resolver = dns.resolver.Resolver()
    resolver.nameservers = ["8.8.8.8", "8.8.4.4"]  # Google nameserver
    ip = str(resolver.resolve(name)[0])
    if (
        ip.count(".") != 3
        or not ip.replace(".", "").isdigit()
        or ip.startswith(("0.", "127.", "10."))
    ):
        raise RuntimeError(f"Cannot resolve {name}, got {ip}")
    return ip


def setup():
    """Set up the hosts file."""
    client_url = os.environ.get("REACT_APP_CLIENT_URL")
    if not client_url or name not in client_url:
        print(f"Not configured to use {name}, no hosts file setup needed.")
        return
    print(f"Hosts file setup for portal at {name}...")
    ip = get_ip()
    with open("/etc/hosts", "r") as hosts_file:
        hosts = hosts_file.read()
    if not hosts.endswith("\n"):
        hosts += "\n"
    re_name = name.replace(".", "\\.")
    new_hosts, num_subs = re.subn(
        rf"^[0-9.]+\s+{re_name}$", f"{ip} {name}", hosts, flags=re.M
    )
    if num_subs:
        if hosts == new_hosts:
            print("Hosts file was already set up.")
        else:
            with open("/etc/hosts", "w") as hosts_file:
                hosts_file.write(new_hosts)
            print("Hosts file has been updated.")
    else:
        host = f"{ip} {name}\n"
        with open("/etc/hosts", "a") as hosts_file:
            hosts_file.write(host)
        print("Hosts file has been set up.")


if __name__ == "__main__":
    setup()
